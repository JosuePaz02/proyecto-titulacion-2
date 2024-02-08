const express = require("express")
const {pagoLink} = require('../controllers/procesamientoPagos.controller.js')

const router = express.Router()

//*Links para pagar
router.get('/banregio/:uuid', pagoLink)

module.exports = router

