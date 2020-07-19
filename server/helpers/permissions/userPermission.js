const { verify } = require('jsonwebtoken')

const canViewAndChangeOwnInfo = (req, res, next) => {
    try {
        if (req.method === 'OPTIONS') return next()

        const token = req.cookies.user
        if (!token) return res.status(401).json({
            success: false,
            message: 'Пожалуйста, авторизуйтесь'
        })

        const decoded = verify(token, process.env.JWT_LOGIN)
        req.userId = decoded.userId
        req.role = decoded.role
        next()
    } catch (e) {
        res.status(401).json({
            success: false,
            message: 'Пожалуйста, авторизуйтесь'
        })
    }
}

const canModerate = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()

    const token = req.cookies.user
    if (!token) return res.status(401).json({
        success: false,
        message: 'Пожалуйста, авторизуйтесь'
    })

    const decoded = verify(token, process.env.JWT_LOGIN)
    const role = decoded.role
    if (role !== 'Модератор') return res.status(403).json({
        success: false,
        message: 'Недостаточно прав'
    })
    req.userId = decoded.userId
    next()
}

module.exports = {
    canViewAndChangeOwnInfo,
    canModerate
}