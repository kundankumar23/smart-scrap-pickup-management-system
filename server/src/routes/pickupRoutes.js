const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createPickupRequest,
} = require("../controllers/pickupController");

router.post(
  "/create",
  protect,
  createPickupRequest
);

module.exports = router;