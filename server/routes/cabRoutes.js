// routes/cabRoutes.js
const express = require("express");
const router = express.Router();
const cabController = require("../controllers/cabController");

router.post(`/add-cab`, cabController.addCab);
// Route to check if a cab is available
//router.get('/check-availability/:cabType', cabController.isCabAvailable);
//router.get('/check-availability/:cabType', cabController.isCabAvailable);

// Route to book a cab

router.get("/getCabs", cabController.getAllCabs);
router.patch("/editCab/:type", cabController.editCab);
router.post("/addCab", cabController.addCab);

module.exports = router;
