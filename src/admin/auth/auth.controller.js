const Admin = require("./auth.model");
const generateAdminToken = require("../../utils/generateAdminToken");
const bcrypt = require("bcryptjs");

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = generateAdminToken(admin._id);

    const adminData = admin.toObject();
    delete adminData.password;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      admin: adminData,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Admin Profile
exports.profile = async (req, res) => {
  return res.json({
    success: true,
    data: req.admin,
  });
};
