const express = require('express');
const router = express.Router();

const pdf = require('../controllers/pdf.controller');

router.get('/pdf/:id', pdf.createPDF);//Development Tool

module.exports = router;