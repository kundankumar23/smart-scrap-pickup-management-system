const express = require("express");
const router = express.Router();

const adminProtect = require("../middleware/adminMiddleware");

const {
  loginAdmin,
  getAllUsers,
  getAllAgents,
  getAllPickups,
  getDashboardStats,
  createAgent,
  deleteAgent,
  deleteUser,
  updatePickupStatus,
} = require("../controllers/adminController");

router.post("/login", loginAdmin);

router.get("/users", adminProtect, getAllUsers);

router.get("/agents", adminProtect, getAllAgents);

router.get("/pickups", adminProtect, getAllPickups);

router.get("/stats", adminProtect, getDashboardStats);

router.delete("/agents/:id", adminProtect, deleteAgent);

router.post("/agents", adminProtect, createAgent);

router.delete("/users/:id", adminProtect, deleteUser);

router.put("/pickups/:id", adminProtect, updatePickupStatus);

module.exports = router;
