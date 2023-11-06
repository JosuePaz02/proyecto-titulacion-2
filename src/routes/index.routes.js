const express = require('express')
const {validateToken} = require('../middlewares/validateToken.js')
const { registroUsuarios, loginUsuario } = require('../controllers/index.controller.js')


const router = express.Router()

router.post('/registro', registroUsuarios)
router.post('/login', loginUsuario)

module.exports = router