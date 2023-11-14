const express = require('express')
const morgan = require('morgan')
const indexRoutes = require('./routes/index.routes.js')
const path = require('path')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))

app.use(indexRoutes)
app.use('/public', express.static(path.join(__dirname, 'public')))



module.exports = app