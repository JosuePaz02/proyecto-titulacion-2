const express = require("express");
const multer = require("multer");
const { linksGet } = require("../controllers/menu.controller.js");
const { generacionMasiva } = require("../middlewares/generacionXlsx.js");
const { rabbitMQRpcClient } = require("../middlewares/queue/Productor.js");
const {
  vistalinks,
  vistanotificaciones,
  generarLink,
  registrouser,
} = require("../controllers/menu.controller.js");

const router = express.Router();

//*Menus
router.get("/menu", linksGet);

//router.get("/home", vistaprincipal)
router.get("/links", vistalinks);
router.post("/generarLink", generarLink);
router.get("/notificaciones", vistanotificaciones);
router.get("/registro", registrouser);

//*Links para pagar
router.get("/banregio/:uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre del archivo en el servidor
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const idUser = req.session.userId;
  const file = req.file.path;
  console.log(file)
  const excel = await generacionMasiva(file, idUser);
  rabbitMQRpcClient(excel);
  res.redirect("/api/links");
});

module.exports = router;
