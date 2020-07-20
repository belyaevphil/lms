const express = require('express')
const controller = require('../controllers/categoriesController')
const validation = require('../helpers/validators/categoryValidation')
const permission = require('../helpers/permissions/userPermission')

const router = express.Router()

router.get('/get', permission.canModerate, controller.getCategories)
router.post('/create', permission.canModerate, validation.createCategoryValidationData, controller.createCategory)
router.delete('/delete/:categoryId', permission.canModerate, controller.deleteCategory)

module.exports = router