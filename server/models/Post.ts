const pool = require('../config/database')

module.exports = class Post {
    constructor(header, content, categoryId, image) {
        this.header = header
        this.content = content
        this.categoryId = categoryId
        this.image = image
    }

    async save() {
        try {
            const queryString = `INSERT INTO posts (header, content, category_id, image) 
                VALUES (?, ?, ?, ?)`
            await pool.query(queryString, [this.header, this.content, this.categoryId, this.image])
        } catch (e) {
            throw e
        }
    }

    static async find(startIndex) {
        try {
            const queryString = `
            SELECT 
                p.id, p.header, p.content, p.creation_date, c.name as category_name
            FROM posts p
            JOIN categories c
                ON p.category_id = c.id
            ORDER BY p.creation_date
            DESC LIMIT ?, 5`
            const [rows] = await pool.query(queryString, [startIndex])
            return rows
        } catch (e) {
            throw e
        }
    }

    static async countById() {
        try {
            const queryString = `SELECT COUNT(id) as count FROM posts`
            const [rows] = await pool.query(queryString)
            return rows[0].count
        } catch (e) {
            throw e
        }
    }

    static async findOneAndUpdate(searchingParam, searchingValue, header, content, categoryId) {
        try {
            const queryString = `UPDATE posts SET header = ?, content = ?, category_id = ?, phonenumber = ? WHERE ?? = ?`
            await pool.query(queryString, [header, content, categoryId, searchingParam, searchingValue])
        } catch (e) {
            throw e
        }
    }

    static async findByIdAndDelete(id) {
        try {
            const queryString = `DELETE FROM posts WHERE id = ?`
            await pool.query(queryString, [id])
        } catch (e) {
            throw e
        }
    }

    static async findById(id) {
        try {
            const queryString = `SELECT * posts WHERE id = ?`
            const [rows] = await pool.query(queryString, [id])
            return rows[0]
        } catch (e) {
            throw e
        }
    }

    static async findOne(param, value) {
        try {
            const queryString = `SELECT * FROM posts WHERE ?? = ?`
            const [rows] = await pool.query(queryString, [param, value])
            return rows[0]
        } catch (e) {
            throw e
        }
    }
}