const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("./auth.model");
const generateToken = require("../../utils/generateToken");

// User Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hash
    });

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = generateToken(user._id, user.role);

    return res.json({
      success: true,
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins

    await user.save();

    return res.json({
      success: true,
      message: "Reset token generated",
      resetToken: token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Token"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.json({
      success: true,
      message: "Password Reset Successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// User Profile
exports.profile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// User Logout
exports.logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
