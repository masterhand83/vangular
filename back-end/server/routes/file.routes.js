const express = require('express');
const router = express.Router();

const file = require('../controllers/file.controller');

router.get('/file/:id', file.downloadFile);//Checked
router.delete('/file/:id', file.deleteFile);//Checked

module.exports = router;