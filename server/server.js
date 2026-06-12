const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./src/models/User");
require("./src/models/Agent");
require("./src/models/Admin");

const connectDB = require("./src/config/db");
const testRoutes = require("./src/routes/testRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const pickupRoutes = require("./src/routes/pickupRoutes");
const agentRoutes = require("./src/routes/agentRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pickup", pickupRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Smart Scrap Pickup API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});