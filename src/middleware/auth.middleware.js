// Auth Middleware (Admin JWT Verification)
// Verifies admin JWT token from Authorization header

const jwt = require("jsonwebtoken");
const Admin = require("../admin/auth/auth.model");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token Missing. Use: Authorization: Bearer <token>",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is empty",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET
    );

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Admin Auth Middleware Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or Expired Token",
    });
  }
};
