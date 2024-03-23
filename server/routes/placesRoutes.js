const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController')


// get shortest path
router.get('/shortest-path/:start/:end', placesController.getShortestPath);


module.exports = router;