const express = require('express')
const morgan = require('morgan')
const indexRoutes = require('./routes/index.routes.js')
const linksRoutes = require('./routes/links.routes.js')
const procesPagos = require('./routes/procesamientoPagos.routes.js')
const path = require('path')
const expressLayouts = require ('express-ejs-layouts')
const ejs = require('ejs')
const session = require('express-session')
const {validateToken} = require('./middlewares/validateToken.js')
const flash = require ("connect-flash")
const app = express()

const redirectHttpToHttps = (req, res, next) => {
    if (req.protocol === 'http') {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    } else {
      next();
    }
  };
  
  app.use(redirectHttpToHttps);

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true
}))
app.use(flash())
app.use((req , res, next )=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash('error_msg');
   next();
});


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));



app.use(expressLayouts)
app.use('/public', express.static(path.join(__dirname, 'public')))


app.use(indexRoutes)
app.use('/api', validateToken, linksRoutes)
app.use(procesPagos)



module.exports = app