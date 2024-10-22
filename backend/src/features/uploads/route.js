const express = require('express');
const router = express.Router();

const multerController = require('../controllers/multerController.js');

router.post('/upload', multerController.multerUpload);


module.exports = router;