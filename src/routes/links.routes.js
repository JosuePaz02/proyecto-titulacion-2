const express = require('express')
const { linksGet } = require('../controllers/index.controller.js')
/*moi*/
const {vistaprincipal, vistalinks, vistanotificaciones} = require('../controllers/controller.js')
/*router.get('/', vistaprincipal)*/
/*router.get('/links', vistalinks)
/*router.get('/notificaciones',vistanotificaciones)

/*module.exports = {routes : links.routes}*/

const router = express.Router()

//*Links
router.get('/menu', linksGet)

module.exports = router
