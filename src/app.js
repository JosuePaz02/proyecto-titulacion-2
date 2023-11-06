const express = require('express')
const morgan = require('morgan')
const indexRoutes = require('./routes/index.routes.js')
const cors = require('cors')


const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))

app.use(indexRoutes)



module.exports = app