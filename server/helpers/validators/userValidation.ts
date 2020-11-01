const { body } = require('express-validator')

const registerUserValidationData = [
    body('email')
        .trim()
        .blacklist("<>/;")
        .notEmpty().withMessage('Поле \"E-mail\" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "E-mail" должно содержать минимум 6 символов')
        .isEmail().withMessage('Поле "E-mail" должно быть валидным e-mail адресом')
        .normalizeEmail(),
    body('password')
        .trim()
        .blacklist("<>/;")
        .notEmpty().withMessage('Поле "Пароль" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "Пароль" должно содержать минимум 6 символов'),
    body('confirmationPassword')
        .trim()
        .blacklist("<>/;")
        .notEmpty().withMessage('Поле "Подтверждающий пароль" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "Подтверждающий пароль" должно содержать минимум 6 символов')
]

const updateUserValidationData = [
    body('firstname')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Имя" не должно быть пустым'),
    body('lastname')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Фамилия" не должно быть пустым'),
    body('patronymic')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Отчество" не должно быть пустым'),
    body('phonenumber')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Номер телефона" не должно быть пустым')
]

const loginUserValidationData = [
    body('email')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "E-mail" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "E-mail" должно содержать минимум 6 символов')
        .isEmail().withMessage('Поле "E-mail" должно быть валидным e-mail адресом')
        .normalizeEmail(),
    body('password')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Пароль" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "Пароль" должно содержать минимум 6 символов'),
]

const forgotPasswordUserValidationData = [
    body('email')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "E-mail" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "E-mail" должно содержать минимум 6 символов')
        .isEmail().withMessage('Поле "E-mail" должно быть валидным e-mail адресом')
        .normalizeEmail()
]

const restorePasswordUserValidationData = [
    body('password')
        .trim()
        .blacklist("<>/;")
        .notEmpty().withMessage('Поле "Пароль" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "Пароль" должно содержать минимум 6 символов'),
    body('confirmationPassword')
        .trim()
        .blacklist("<>/;")
        .notEmpty().withMessage('Поле "Подтверждающий пароль" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "Подтверждающий пароль" должно содержать минимум 6 символов')
]

module.exports = {
    registerUserValidationData,
    updateUserValidationData,
    loginUserValidationData,
    forgotPasswordUserValidationData,
    restorePasswordUserValidationData
}