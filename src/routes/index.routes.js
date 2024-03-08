const express = require('express')
const {validateToken} = require('../middlewares/validateToken.js')
const {validateRegex} = require('../middlewares/regex.js')
const { registroUsuarios, loginUsuario, loginGet, registroGet } = require('../controllers/index.controller.js')

const {recuperarContraseniaPost, restablecerContraseniaGet, restablecerContraseniaPost, recuperarContraseniaGet} = require('../controllers/recuperarContraseña.controller.js')


const router = express.Router()

//*Registro
router.get('/registro', registroGet)
router.post('/registro', validateRegex, registroUsuarios)

//*Login 
router.get('/login', loginGet)
router.post('/login', loginUsuario)

//*recuperar contraseña
router.get('/recuperarcontrasenia', recuperarContraseniaGet)
router.post('/rec', recuperarContraseniaPost)
router.get('/:uuid', restablecerContraseniaGet)
router.post('/restablecer', restablecerContraseniaPost)


module.exports = router