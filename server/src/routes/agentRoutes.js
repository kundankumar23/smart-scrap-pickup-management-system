const express = require("express");
const router = express.Router();

const {
  registerAgent,
} = require("../controllers/agentController");

router.post("/register", registerAgent);

module.exports = router;