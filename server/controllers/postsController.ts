const Post = require('../models/Post')
const Category = require('../models/Category')
const { validationResult } = require('express-validator')

const createPost = async (req, res) => {
    try {
        const errors = validationResult(req)
        console.log(req.file)
        console.log(req.body)
        if (!errors.isEmpty()) return res.status(422).json({
            success: false,
            message: `${errors.errors[0].msg}`
        })

        const { header, content, categoryName } = req.body
        const image = req.file.path

        const post = await Post.findOne('header', header)
        if (post) return res.status(400).json({
            success: false,
            message: 'Пост с таким названием уже существует'
        })

        const category = await Category.findOne('name', categoryName)

        const newPost = new Post(header, content, category.id, image)
        await newPost.save()

        res.status(201).json({
            success: true,
            message: 'Пост был создан успешно'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const createNewPost = async (req, res) => {
    try {
        console.log(req.file)
        console.log(req.body)
        res.json({
            message: 'hello'
        })
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const getPosts = async (req, res) => {
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

const updatePost = async (req, res) => {
    try {
        const postId = req.params.postId
        const { header, content, categoryName } = req.body
        const categoryId = await Category.findOne('name', categoryName)

        await Post.findOneAndUpdate('id', postId, header, content, categoryId)

        res.json({
            success: true,
            message: 'Пост был обновлен успешно'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId

        await Post.findByIdAndDelete(postId)

        res.json({
            success: true,
            message: 'Пост был удален успешно'
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    createNewPost
}