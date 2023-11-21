const express = require('express')
const { linksGet } = require('../controllers/index.controller.js')


const router = express.Router()

//*Links
router.get('/menu', linksGet)

module.exports = router
