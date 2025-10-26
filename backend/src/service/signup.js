import { User } from "../models/userSchema.js";

function checkStrongPassword(password) {
  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return strongPasswordRegex.test(password);
}

export const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "Error",
        message: "Username, email, and password are required",
        data: null,
        error: "Missing required fields",
      });
    }

    //  Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        status: "Error",
        message: "Email or username already exists",
        data: null,
        error: "Duplicate user",
      });
    }

    //  Check password strength
    if (!checkStrongPassword(password)) {
      return res.status(400).json({
        status: "Error",
        message:
          "Password must be at least 8 characters, include an uppercase letter, a number, and a special character",
        data: null,
        error: "Weak password",
      });
    }

    //  Create new user
    const user = await User.create({ username, email, password });

    return res.status(201).json({
      status: "Success",
      message: "User registered successfully!",
      data: { id: user._id, username: user.username, email: user.email },
      error: null,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      status: "Error",
      message: "Failed to register user",
      data: null,
      error: error.message,
    });
  }
};
