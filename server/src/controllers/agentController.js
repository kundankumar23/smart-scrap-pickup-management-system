const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const registerAgent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

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
      password: hashedPassword,
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

const loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });

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
};