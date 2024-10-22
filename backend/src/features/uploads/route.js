const express = require('express');
const router = express.Router();

const multerController = require('./upload');

router.post('/upload', multerController.multerUpload);


module.exports = router;