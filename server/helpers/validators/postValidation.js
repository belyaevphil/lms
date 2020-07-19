const { body } = require('express-validator')

const createPostValidationData = [
    body('header')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Название статьи" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "Название статьи" должно содержать минимум 6 символов'),
    body('content')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Контент статьи" не должно быть пустым')
        .isLength({ min: 10 }).withMessage('Поле "Контент статьи" должно содержать минимум 10 символов'),
    body('categoryName')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Категория" не должно быть пустым')
]

const updatePostValidationData = [
    body('header')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Название статьи" не должно быть пустым')
        .isLength({ min: 6 }).withMessage('Поле "Название статьи> должно содержать минимум 6 символов'),
    body('content')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Контент статьи" не должно быть пустым')
        .isLength({ min: 10 }).withMessage('Поле "Контент статьи" должно содержать минимум 10 символов'),
    body('categoryName')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Категория" не должно быть пустым')
]

module.exports = {
    createPostValidationData,
    updatePostValidationData
}