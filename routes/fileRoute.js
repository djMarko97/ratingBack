const express = require('express');
const router = express.Router();
const fileCtrl = require('../controllers/fileCtrl');

router.post('/v1/profile/upload', fileCtrl.addImage);
router.post('/v1/gym/upload', fileCtrl.addLogo);

module.exports = router;