const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createPickupRequest,
  getMyPickups,
  getAssignedPickups,
  updatePickupStatus,
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

router.get(
  "/assigned",
  protect,
  getAssignedPickups
);

router.put(
  "/status/:pickupId",
  protect,
  updatePickupStatus
);

module.exports = router;