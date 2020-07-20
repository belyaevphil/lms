const pool = require('../config/database')

module.exports = class Category {
    constructor(name) {
        this.name = name
    }

    async save() {
        try {
            const queryString = `INSERT INTO categories (name) VALUES (?)`
            await pool.query(queryString, [this.name])
        } catch (e) {
            throw e
        }
    }

    static async findOne(param, value) {
        try {
            const queryString = `SELECT * FROM categories WHERE ?? = ?`
            const [rows] = await pool.query(queryString, [param, value])
            return rows[0]
        } catch (e) {
            throw e
        }
    }

    static async findByIdAndDelete(id) {
        try {
            const queryString = `DELETE FROM categories WHERE id = ?`
            await pool.query(queryString, [id])
        } catch (e) {
            throw e
        }
    }

    static async find() {
        try {
            const queryString = `SELECT name FROM categories ORDER BY name`
            const [rows] = await pool.query(queryString)
            return rows
        } catch (e) {
            throw e
        }
    }

    static async findOneAndUpdate(searchingParam, searchingValue, name) {
        try {
            const queryString = `UPDATE categories SET name = ? WHERE ?? = ?`
            await pool.query(queryString, [name, searchingParam, searchingValue])
        } catch (e) {
            throw e
        }
    }
}