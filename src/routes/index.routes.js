const express = require('express')
const {validateToken} = require('../middlewares/validateToken.js')
const { registroUsuarios, loginUsuario, profile, loginGet } = require('../controllers/index.controller.js')


const router = express.Router()

router.post('/registro', registroUsuarios)

router.get('/login', loginGet)
router.post('/login', loginUsuario)
router.get('/generarLink', validateToken,profile)

module.exports = router