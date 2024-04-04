const express = require("express")
const { linksGet } = require("../controllers/menu.controller.js")
const {
  vistalinks,
  vistanotificaciones,
  generarLink,registrouser
} = require("../controllers/menu.controller.js")

const router = express.Router()

//*Menus
router.get("/menu", linksGet)

//router.get("/home", vistaprincipal)
router.get("/links", vistalinks)
router.post('/generarLink', generarLink)
router.get("/notificaciones", vistanotificaciones)
router.get("/registro",registrouser)


//*Links para pagar
router.get('/banregio/:uuid')

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'ramsEvidence/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo en el servidor
    }
  });
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
  });

module.exports = router
