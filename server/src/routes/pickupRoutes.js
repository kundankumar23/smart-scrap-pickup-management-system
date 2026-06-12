const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createPickupRequest,
  getMyPickups,
} = require("../controllers/pickupController");

router.post(
  "/create",
  protect,
  createPickupRequest
);

router.get(
  "/my-pickups",
  protect,
  getMyPickups
);

module.exports = router;