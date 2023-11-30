const express = require('express')
const { linksGet } = require('../controllers/index.controller.js')
/*moi*/
const {vistaprincipal} = require('../controllers/controller.js')
/*router.get('/', vistaprincipal)
/*module.exports = {routes : links.routes}*/

const router = express.Router()

//*Links
router.get('/menu', linksGet)

module.exports = router
