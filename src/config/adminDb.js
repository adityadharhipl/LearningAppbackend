const mongoose = require("mongoose");

// Separate Mongoose connection for Admin DB
let adminConnection = null;

const connectAdminDB = async () => {
  try {
    adminConnection = await mongoose.createConnection(
      process.env.ADMIN_MONGO_URI
    );
    console.log("Admin MongoDB Connected (elearning_admin)");
    return adminConnection;
  } catch (error) {
    console.error("Admin DB Connection Error:", error.message);
    process.exit(1);
  }
};

const getAdminConnection = () => {
  if (!adminConnection) {
    throw new Error("Admin DB not connected yet. Call connectAdminDB() first.");
  }
  return adminConnection;
};

module.exports = { connectAdminDB, getAdminConnection };
