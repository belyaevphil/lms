const pool = require('../config/database')

module.exports = class Course {
    constructor(name, description, price) {
        this.name = name
        this.description = description
        this.price = price
    }

    async save() {
        try {
            const queryString = `INSERT INTO availablecourses (name, description, price) VALUES (?, ?, ?)`
            await pool.query(queryString, [this.name, this.description, this.price])
        } catch (e) {
            throw e
        }
    }

    static async findOne(param, value) {
        try {
            const queryString = `SELECT * FROM availablecourses WHERE ?? = ?`
            const [rows] = await pool.query(queryString, [param, value])
            return rows[0]
        } catch (e) {
            throw e
        }
    }

    static async findSold(userId, startIndex) {
        try {
            const queryString = `SELECT *
                FROM availablecourses
                WHERE id IN (SELECT (course_id)
                FROM soldcourses WHERE user_id = ?)
                ORDER BY price LIMIT ?, 5`
            const [rows] = await pool.query(queryString, [userId, startIndex])
            return rows
        } catch (e) {
            throw e
        }
    }

    static async countSoldById(userId) {
        try {
            const queryString = `SELECT COUNT(id) as count
            FROM availablecourses
            WHERE id IN (SELECT (course_id)
            FROM soldcourses WHERE user_id = ?)`
            const [rows] = await pool.query(queryString, [userId])
            return rows[0].count
        } catch (e) {
            throw e
        }
    }

    static async findAvailable(userId, startIndex) {
        try {
            const queryString = `SELECT *
                FROM availablecourses
                WHERE id NOT IN (SELECT (course_id)
                FROM soldcourses WHERE user_id = ?)
                ORDER BY price LIMIT ?, 5`
            const [rows] = await pool.query(queryString, [userId, startIndex])
            return rows
        } catch (e) {
            throw e
        }
    }

    static async countAvailableById(userId) {
        try {
            const queryString = `SELECT COUNT(id) as count
            FROM availablecourses
            WHERE id NOT IN (SELECT (course_id)
            FROM soldcourses WHERE user_id = ?)`
            const [rows] = await pool.query(queryString, [userId])
            return rows[0].count
        } catch (e) {
            throw e
        }
    }
}