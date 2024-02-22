const express = require("express")
const {pagoLink, pagoLinkPost} = require('../controllers/procesamientoPagos.controller.js')

const router = express.Router()

//*Links para pagar
router.get('/banregio/:uuid', pagoLink)
router.post('/enviado', pagoLinkPost)

module.exports = router

