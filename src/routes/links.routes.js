const express = require("express")
const { linksGet } = require("../controllers/menu.controller.js")
const {
  vistalinks,
  vistanotificaciones,
  generarLink
} = require("../controllers/menu.controller.js")

const router = express.Router()

//*Menus
router.get("/menu", linksGet)

//router.get("/home", vistaprincipal)
router.get("/links", vistalinks)
router.post('/generarLink', generarLink)
router.get("/notificaciones", vistanotificaciones)


//*Links para pagar
router.get('/banregio/:uuid')

module.exports = router
