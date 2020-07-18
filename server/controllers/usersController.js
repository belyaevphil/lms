const User = require('../models/User')
const { validationResult } = require('express-validator')
const { hash, compare } = require('bcryptjs')
const { sign, verify } = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            message: `${errors.errors[0].msg}`
        })

        const { email, password, confirmationPassword } = req.body

        if (password !== confirmationPassword) return res.status(400).json({
            success: false,
            message: 'Пароли не совпадают'
        })

        const user = await User.findOne('email', email)
        if (user) return res.status(400).json({
            success: false,
            message: 'Пользователь с данным e-mail адресом уже существует'
        })

        const hashedPassword = await hash(password, 12)

        const activationToken = sign(
            {
                email,
                password: hashedPassword
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            { expiresIn: '1m' }
        )

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_ACCOUNT_EMAIL,
                pass: process.env.GOOGLE_ACCOUNT_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link',
            text: `Пожалуйста перейдите по ссылке, чтобы активировать Ваш аккаунт: ${process.env.CLIENT_URL}/activateaccount/${activationToken}`,
            html: `
                    <h1>Пожалуйста перейдите по ссылке ниже, чтобы активировать Ваш аккаунт</h1>
                    <hr>
                    <p>${process.env.CLIENT_URL}/activateaccount/${activationToken}</p>
                  `
        }
        await transporter.sendMail(mailOptions)

        res.json({
            success: true,
            message: `Письмо для активации было отправлено на почту: ${email}`
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const activateUserAccount = async (req, res) => {
    try {
        const { activationToken } = req.body
        if (!activationToken) return res.status(401).json({
            success: false,
            message: 'Истек срок действия активационного токена, повторите регистрацию'
        })

        const decodedActivationToken = verify(activationToken, process.env.JWT_ACCOUNT_ACTIVATION)
        if (!decodedActivationToken) return res.status(401).json({
            success: false,
            message: 'Истек срок действия активационного токена, повторите регистрацию'
        })
        const { email, password } = decodedActivationToken

        const newUser = new User(email, password)
        await newUser.save()

        res.status(201).json({
            success: true,
            message: 'Аккаунт был активирован успешно, это окно закроется само через 5 секунд'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Истек срок действия активационного токена, повторите регистрацию'
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            message: `${errors.errors[0].msg}`
        })

        const { email, password } = req.body

        const user = await User.findOne('email', email)
        if (!user) return res.status(400).json({
            success: false,
            message: 'Некорректный e-mail адрес или пароль'
        })

        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) return res.status(400).json({
            success: false,
            message: 'Некорректный e-mail адрес или пароль'
        })

        const userId = user.id
        const role = user.role
        const loginToken = sign(
            {
                userId,
                role
            },
            process.env.JWT_LOGIN,
            { expiresIn: '1m' }
        )

        res.cookie('user', loginToken, {
            maxAge: 60000,
            httpOnly: true,
            sameSite: "lax"
            //secure: true - in production
        }).json({
            success: true,
            message: 'Вы успешно вошли в свой аккаунт'
        }).end()
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('user').json({
            success: true,
            message: 'Вы успешно вышли со своего аккаунта'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const checkloginstatus = async (req, res) => {
    try {
        const role = req.role
        if (!role) return res.status(401).json({
            success: false,
            loginStatus: false,
            role: null
        })
        res.json({
            success: true,
            loginStatus: true,
            role
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            message: `${errors.errors[0].msg}`
        })

        const id = req.userId
        const { firstname, lastname, patronymic, phonenumber } = req.body

        await User.findOneAndUpdateInfo('id', id, firstname, lastname, patronymic, phonenumber)

        res.json({
            success: true,
            message: 'Ваши данные были обновлены успешно'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findOne('id', userId)
        if (!user) return res.status(400).json({
            success: false,
            message: 'Такого пользователя нет'
        })

        res.json({
            success: true,
            user
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const results = req.paginatedResults

        res.json({
            success: true,
            results
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            message: `${errors.errors[0].msg}`
        })

        const { email } = req.body

        const user = await User.findOne('email', email)
        if (!user) return res.status(400).json({
            success: false,
            message: 'Некорректный e-mail адрес или пароль'
        })

        const restorationToken = sign(
            {
                email
            },
            process.env.JWT_PASSWORD_RESTORATION,
            { expiresIn: '1m' }
        )

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_ACCOUNT_EMAIL,
                pass: process.env.GOOGLE_ACCOUNT_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link',
            text: `Пожалуйста перейдите по ссылке, чтобы восстановить Ваш пароль: ${process.env.CLIENT_URL}/restorepassword/${restorationToken}`,
            html: `
                    <h1>Пожалуйста перейдите по ссылке ниже, чтобы восстановить Ваш пароль</h1>
                    <hr>
                    <p>${process.env.CLIENT_URL}/restorepassword/${restorationToken}</p>
                  `
        }
        await transporter.sendMail(mailOptions)

        res.json({
            success: true,
            message: `Письмо для восстановления пароля было отправлено на почту: ${email}`
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const restorePassword = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            message: `${errors.errors[0].msg}`
        })

        const { restorationToken, password, confirmationPassword } = req.body
        if (password !== confirmationPassword) return res.status(400).json({
            success: false,
            message: 'Пароли не совпадают'
        })
        if (!restorationToken) return res.status(401).json({
            success: false,
            message: 'Истек срок действия восстанавливающего токена, повторите попытку смены пароля'
        })

        const decodedActivationToken = verify(restorationToken, process.env.JWT_PASSWORD_RESTORATION)
        if (!decodedActivationToken) return res.status(401).json({
            success: false,
            message: 'Истек срок действия восстанавливающего токена, повторите попытку смены пароля'
        })
        const { email } = decodedActivationToken
        const hashedPassword = await hash(password, 12)
        await User.findOneAndRestorePassword('email', email, hashedPassword)

        res.json({
            success: true,
            message: 'Вы успешно восстановили свой пароль, это окно закроется само через 5 секунд'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Истек срок действия восстанавливающего токена, повторите попытку смены пароля'
        })
    }
}

module.exports = {
    registerUser,
    activateUserAccount,
    loginUser,
    updateUser,
    getUsers,
    getUserById,
    logoutUser,
    checkloginstatus,
    forgotPassword,
    restorePassword
}