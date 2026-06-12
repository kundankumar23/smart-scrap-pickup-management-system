const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Agent
const registerAgent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      city,
    } = req.body;

    const existingAgent = await Agent.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingAgent) {
      return res.status(400).json({
        success: false,
        message: "Agent already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const agent = await Agent.create({
      name,
      email,
      phone,
      password: hashedPassword,
      city,
    });

    res.status(201).json({
      success: true,
      message: "Agent registered successfully",
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

// Login Agent
const loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({
      email,
    });

    if (!agent) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      agent.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: agent._id,
        role: "agent",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Agent Login Successful",
      token,

      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        city: agent.city,
        isAvailable:
          agent.isAvailable,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Availability
const updateAvailability = async (
  req,
  res
) => {
  try {
    const { isAvailable } = req.body;

    const agent =
      await Agent.findByIdAndUpdate(
        req.user.id,
        { isAvailable },
        { new: true }
      );

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Availability updated successfully",
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

// Get Agent Profile
const getAgentProfile = async (
  req,
  res
) => {
  try {
    const agent =
      await Agent.findById(
        req.user.id
      ).select("-password");

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
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

module.exports = {
  registerAgent,
  loginAgent,
  updateAvailability,
  getAgentProfile,
};