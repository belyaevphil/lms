const pool = require('../config/database')

module.exports = class User {
    constructor(email, password) {
        this.email = email
        this.password = password
    }

    async save() {
        try {
            const queryString = `INSERT INTO users (email, password) 
                VALUES (?, ?)`
            await pool.query(queryString, [this.email, this.password])
        } catch (e) {
            throw e
        }
    }

    static async findByIdAndDelete(id) {
        try {
            const queryString = `DELETE FROM users WHERE id = ?`
            await pool.query(queryString, [id])
        } catch (e) {
            throw e
        }
    }

    static async findOne(param, value) {
        try {
            const queryString = `SELECT * FROM users WHERE ?? = ?`
            const [rows] = await pool.query(queryString, [param, value])
            return rows[0]
        } catch (e) {
            throw e
        }
    }

    static async find(startIndex) {
        try {
            const queryString = `SELECT * FROM users ORDER BY lastname DESC LIMIT ?, 5`
            const [rows] = await pool.query(queryString, [startIndex])
            return rows
        } catch (e) {
            throw e
        }
    }

    static async countById() {
        try {
            const queryString = `SELECT COUNT(id) as count FROM users`
            const [rows] = await pool.query(queryString)
            return rows[0].count
        } catch (e) {
            throw e
        }
    }

    static async findOneAndUpdateInfo(searchingParam, searchingValue, firstname, lastname, patronymic, phonenumber, about) {
        try {
            const queryString = `UPDATE users SET firstname = ?, lastname = ?, patronymic = ?, phonenumber = ?, about = ? WHERE ?? = ?`
            await pool.query(queryString, [firstname, lastname, patronymic, phonenumber, about, searchingParam, searchingValue])
        } catch (e) {
            throw e
        }
    }

    static async findOneAndRestorePassword(searchingParam, searchingValue, password) {
        try {
            const queryString = `UPDATE users SET password = ? WHERE ?? = ?`
            await pool.query(queryString, [password, searchingParam, searchingValue])
        } catch (e) {
            throw e
        }
    }
}