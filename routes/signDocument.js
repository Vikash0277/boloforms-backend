// routes/documentRoutes.js or similar
const express = require('express');
const router = express.Router();
const { getDocumentForSigner } = require('../controllers/signController');

router.get('/sign/:documentId/:email', getDocumentForSigner);

module.exports = router;
