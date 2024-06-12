const express = require("express")
const {pagoLink, pagoLinkPost} = require('../controllers/procesamientoPagos.controller.js')

const router = express.Router()

//*Links para pagar
router.get('/banregio/:folio', pagoLink)
router.post('/pagado/:folio', pagoLinkPost)

module.exports = router

