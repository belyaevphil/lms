require('dotenv').config({
    path: './config/config.env'
})
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = process.env.PORT

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())
app.use(cookieParser())

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Страница не найдена'
    })
})

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))