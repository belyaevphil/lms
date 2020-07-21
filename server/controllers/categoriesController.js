const Category = require('../models/Category')
const { validationResult } = require('express-validator')

const createCategory = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            message: `${errors.errors[0].msg}`
        })

        const { name } = req.body

        const category = await Category.findOne('name', name)
        if (category) return res.status(400).json({
            success: false,
            message: 'Такая категория уже существует'
        })

        const newCategory = new Category(name)
        await newCategory.save()

        res.status(201).json({
            success: true,
            message: 'Категория была создана успешно'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId

        await Category.findByIdAndDelete(categoryId)

        res.json({
            success: true,
            message: 'Категория была удалена успешно'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()

        res.json({
            success: true,
            categories
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    getCategories
}