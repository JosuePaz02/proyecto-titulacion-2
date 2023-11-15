const express = require('express')
const {validateToken} = require('../middlewares/validateToken.js')
const { registroUsuarios, loginUsuario, loginGet, registroGet, linksGet } = require('../controllers/index.controller.js')


const router = express.Router()

//*Registro
router.get('/registro', registroGet)
router.post('/registro', registroUsuarios)

//*Login 
router.get('/login', loginGet)
router.post('/login', loginUsuario)

//*Links
router.get('/generarLink', validateToken, linksGet)

module.exports = router