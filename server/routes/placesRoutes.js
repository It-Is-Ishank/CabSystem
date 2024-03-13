const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController')

// get shortest path
router.get('/shortest-distance/:start/:end', placesController.getShortedistance);


module.exports = router;