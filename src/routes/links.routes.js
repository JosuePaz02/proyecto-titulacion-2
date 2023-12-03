const express = require("express");
const { linksGet } = require("../controllers/menu.controller.js");
const {
  vistaprincipal,
  vistalinks,
  vistanotificaciones,
} = require("../controllers/menu.controller.js");

const router = express.Router();

//*Menus
router.get("/menu", linksGet);

router.get("/vistaprincipal", vistaprincipal);
router.get("/vistalinks", vistalinks);
router.get("/vistanotificaciones", vistanotificaciones);

module.exports = router;
