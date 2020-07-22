const express = require('express')
const controller = require('../controllers/postsController')
const validation = require('../helpers/validators/postValidation')
const pagination = require('../helpers/pagination/pagination')
const permission = require('../helpers/permissions/userPermission')
const Post = require('../models/Post')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toLocaleDateString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Можно загружать только файлы с расширением .jpeg и .png'), false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
})

const router = express.Router()

router.post('/create', permission.canModerate, upload.single('image'), validation.createPostValidationData, controller.createPost)
//router.post('/createnewpost', upload.single('image'), controller.createNewPost)
router.get('/get', pagination.paginatedResults(Post), controller.getPosts) //    example: /api/posts/get?page=1
router.delete('/delete/:postId', permission.canModerate, controller.deletePost)
router.patch('/update/:postId', permission.canModerate, controller.updatePost)

module.exports = router