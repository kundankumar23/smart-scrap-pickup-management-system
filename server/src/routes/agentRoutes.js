const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerAgent,
  loginAgent,
  updateAvailability,
  getAgentProfile,
} = require("../controllers/agentController");

// Public Routes
router.post("/register", registerAgent);
router.post("/login", loginAgent);

// Protected Routes
router.put(
  "/availability",
  protect,
  updateAvailability
);

router.get(
  "/profile",
  protect,
  getAgentProfile
);

module.exports = router;