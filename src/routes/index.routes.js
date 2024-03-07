const express = require('express')
const {validateToken} = require('../middlewares/validateToken.js')
const {validateRegex} = require('../middlewares/regex.js')
const { registroUsuarios, loginUsuario, loginGet, registroGet } = require('../controllers/index.controller.js')

const {recuperarContraseñaPost, restablecerContraseñaGet, restablecerContraseñaPost, recuperarContraseñaGet} = require('../controllers/recuperarContraseña.controller.js')


const router = express.Router()

//*Registro
router.get('/registro', registroGet)
router.post('/registro', validateRegex, registroUsuarios)

//*Login 
router.get('/login', loginGet)
router.post('/login', loginUsuario)

//*recuperar contraseña
router.get('/recuperarcontraseña', recuperarContraseñaGet)
router.post('/rec', recuperarContraseñaPost)
router.get('/:uuid', restablecerContraseñaGet)
router.post('/restablecer', restablecerContraseñaPost)


module.exports = router