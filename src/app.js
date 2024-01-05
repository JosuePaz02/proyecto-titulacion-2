const express = require('express')
const morgan = require('morgan')
const indexRoutes = require('./routes/index.routes.js')
const linksRoutes = require('./routes/links_routes.js')
const path = require('path')
const expressLayouts = require ('express-ejs-layouts')
const ejs = require('ejs')
const session = require('express-session')
const {validateToken} = require('./middlewares/validateToken.js')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true
}))


app.set('view engine', 'ejs')
app.use(indexRoutes)
app.use('/api', validateToken, linksRoutes)


app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')))
//const routerr = require ('./routes/links_routes.js') es lo que estamos haciendo ahorita 
//app.use(routerr.linksRoutes) es lo que estamos haciendo ahorita
/*moi*/
app.use(expressLayouts)
//utilizamos el router
require('./routes/links_routes.js') //creo que por esto como esta repetido dos veces no jala como dice este josue 
app.use(linksRoutes)
//finmoi

module.exports = app