const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerAgent,
  loginAgent,
  updateAvailability,
  updateLocation,
} = require("../controllers/agentController");

router.post("/register", registerAgent);
router.post("/login", loginAgent);
router.put("/availability", protect, updateAvailability);
router.put("/location", protect, updateLocation);

module.exports = router;