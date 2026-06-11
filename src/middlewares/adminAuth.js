const jwt = require( "jsonwebtoken");

const Admin = require("../models/Admin");

module.exports = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          "Token Missing"
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const admin =
      await Admin.findById(
        decoded.id
      );

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Admin Not Found"
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Unauthorized"
    });
  }
};