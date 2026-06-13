const jwt = require("jsonwebtoken");

const generateAdminToken = (adminId) => {
  return jwt.sign(
    {
      id: adminId,
      role: "admin",
    },
    process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateAdminToken;