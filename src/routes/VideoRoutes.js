const express = require('express');
const videoController = require('../controllers/VideoController');

const router = express.Router();

router.get('/fetch-video-data', videoController.fetchVideoData);

module.exports = router;