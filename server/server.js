const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./src/models/User");

const connectDB = require("./src/config/db");
const testRoutes = require("./src/routes/testRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Smart Scrap Pickup API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});