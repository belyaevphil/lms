const express = require('express')
const controller = require('../controllers/coursesController')
const pagination = require('../helpers/pagination/pagination')
const permission = require('../helpers/permissions/userPermission')
const Course = require('../models/Course')

const router = express.Router()

router.get('/getavailable', permission.canViewAndChangeOwnInfo, pagination.paginatedCourseResults(Course, 'available'), controller.getAvailableCourses) //    example: /api/courses/getavailable?page=1
router.get('/getsold', permission.canViewAndChangeOwnInfo, pagination.paginatedCourseResults(Course, 'sold'), controller.getSoldCourses) //    example: /api/courses/getsold?page=1

module.exports = router