const { body } = require('express-validator')

const createCategoryValidationData = [
    body('name')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Название категории" не должно быть пустым')
        .isLength({ min: 4 }).withMessage('Поле "Название категории" должно содержать минимум 4 символа')
]

const updateCategoryValidationData = [
    body('name')
        .trim()
        .blacklist("<>/")
        .notEmpty().withMessage('Поле "Название категории" не должно быть пустым')
        .isLength({ min: 4 }).withMessage('Поле "Название категории" должно содержать минимум 4 символа')
]

module.exports = {
    createCategoryValidationData,
    updateCategoryValidationData
}