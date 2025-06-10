const express = require('express');
const upload = require('../middlewares/uploadFile');
const { uploadDocument} = require('../controllers/uploadDocumentController');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadDocument);


module.exports = router;

