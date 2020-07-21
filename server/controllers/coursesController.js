const Course = require('../models/Course')

const getAvailableCourses = async (req, res) => {
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

const getSoldCourses = async (req, res) => {
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

module.exports = {
    getAvailableCourses,
    getSoldCourses
}