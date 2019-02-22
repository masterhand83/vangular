const express = require('express');
const router = express.Router();

const crypto = require('../controllers/crypto.controller');

router.post('/encrypt', crypto.encrypt);//Development Tool
router.post('/decrypt', crypto.decrypt);//Development Tool

module.exports = router;