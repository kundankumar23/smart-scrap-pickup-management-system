const express = require("express");
const router = express.Router();

const adminProtect = require("../middleware/adminMiddleware");

const {
  loginAdmin,
  getAllUsers,
  getAllAgents,
  getAllPickups,
  getDashboardStats,
} = require("../controllers/adminController");

router.post("/login", loginAdmin);

router.get(
  "/users",
  adminProtect,
  getAllUsers
);

router.get(
  "/agents",
  adminProtect,
  getAllAgents
);

router.get(
  "/pickups",
  adminProtect,
  getAllPickups
);

router.get(
  "/stats",
  adminProtect,
  getDashboardStats
);

module.exports = router;