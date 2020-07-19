const express = require('express')
const controller = require('../controllers/usersController')
const validation = require('../helpers/validators/userValidation')
const permission = require('../helpers/permissions.js/userPermission')
const pagination = require('../helpers/pagination/pagination')
const User = require('../models/User')

const router = express.Router()

router.get('/get', pagination.paginatedResults(User), controller.getUsers) //    example: /api/users/get?page=1
router.get('/profiles', controller.getUserById) //    example: /api/users/profiles?id=1
router.get('/myprofile', permission.canViewAndChangeOwnInfo, controller.getMyProfile)
router.get('/logout', controller.logoutUser)
router.get('/checkloginstatus', permission.canViewAndChangeOwnInfo, controller.checkloginstatus)
router.post('/register', validation.registerUserValidationData, controller.registerUser)
router.post('/activate', controller.activateUserAccount)
router.post('/login', validation.loginUserValidationData, controller.loginUser)
router.post('/forgotpassword', validation.forgotPasswordUserValidationData, controller.forgotPassword)
router.post('/restorepassword', validation.restorePasswordUserValidationData, controller.restorePassword)
router.patch('/updateinfo', permission.canViewAndChangeOwnInfo, validation.updateUserValidationData, controller.updateUser)

module.exports = router