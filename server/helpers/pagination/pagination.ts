const paginatedResults = model => {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page)
            const startIndex = (page - 1) * 5
            const endIndex = page * 5 - 1
            const posts = await model.find(startIndex)
            const count = await model.countById()

            const results = {}
            if (endIndex < count) {
                results.nextPage = page + 1
            }
            if (startIndex > 0) {
                results.previousPage = page - 1
            }
            results.count = count
            results.posts = posts

            req.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    }
}

const paginatedCourseResults = (model, kind) => {
    return async (req, res, next) => {
        try {
            const userId = req.userId
            const page = parseInt(req.query.page)
            const startIndex = (page - 1) * 5
            const endIndex = page * 5 - 1
            let posts
            let count
            if (kind === 'sold') {
                posts = await model.findSold(userId, startIndex)
                count = await model.countSoldById(userId)
            } else if (kind === 'available') {
                posts = await model.findAvailable(userId, startIndex)
                count = await model.countAvailableById(userId)
            }

            const results = {}
            if (endIndex < count) {
                results.nextPage = page + 1
            }
            if (startIndex > 0) {
                results.previousPage = page + 1
            }
            results.count = count
            results.posts = posts

            req.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    }
}

module.exports = {
    paginatedResults,
    paginatedCourseResults
}