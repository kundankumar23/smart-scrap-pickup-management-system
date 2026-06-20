const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Agent = require("../models/Agent");
const PickupRequest = require("../models/PickupRequest");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      email,
    }).select("+password");

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");

    res.status(200).json({
      success: true,
      count: agents.length,
      agents,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest.find()
      .populate("user", "name email phone")
      .populate("assignedAgent", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pickups.length,
      pickups,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalAgents = await Agent.countDocuments();

    const totalPickups = await PickupRequest.countDocuments();

    const completedPickups = await PickupRequest.countDocuments({
      status: "Completed",
    });

    const pendingPickups = await PickupRequest.countDocuments({
      status: {
        $ne: "Completed",
      },
    });

    res.status(200).json({
      success: true,

      totalUsers,
      totalAgents,
      totalPickups,

      completedPickups,
      pendingPickups,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await Agent.findByIdAndDelete(id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createAgent = async (req, res) => {
  try {
    const { name, email, phone, city, password } = req.body;

    const existingAgent = await Agent.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingAgent) {
      return res.status(400).json({
        success: false,
        message: "Agent already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await Agent.create({
      name,
      email,
      phone,
      city,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Agent created",
      agent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updatePickupStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const pickup = await PickupRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.status(200).json({
      success: true,
      pickup,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  loginAdmin,
  getAllUsers,
  getAllAgents,
  getAllPickups,
  getDashboardStats,
  deleteAgent,
  createAgent,
  deleteUser,
  updatePickupStatus,
};
