const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "admins", // 👈 explicitly stored in "admins" collection
  }
);

module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
