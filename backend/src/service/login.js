import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Compare password
const matchPassword = async (user, password) => {
  return bcrypt.compare(password, user.password);
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    //  Check required fields
    if (!identifier || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Username/email and password are required",
        data: null,
        error: "Missing required fields",
      });
    }

    //  Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid credentials",
        data: null,
        error: "User not found",
      });
    }

    //  Compare password
    const isMatched = await matchPassword(user, password);
    if (!isMatched) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid credentials",
        data: null,
        error: "Password mismatch",
      });
    }

    //  Generate token
    const token = generateToken(user._id);

    //  Respond with token and user info
    return res.status(200).json({
      status: "Success",
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      },
      error: null,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: "Error",
      message: "Login failed",
      data: null,
      error: error.message,
    });
  }
};
