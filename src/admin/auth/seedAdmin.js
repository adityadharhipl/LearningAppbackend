require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../src/modules/admin/auth/auth.model"); // path adjust karo

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const email = "admin@elearning.com";
    const password = "Admin@1234";

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.findOneAndUpdate(
      { email },
      {
        name: "Super Admin",
        email,
        password: hashedPassword,
        isSuperAdmin: true,
      },
      {
        upsert: true,
        new: true,
      }
    );

    console.log("Admin Ready");
    console.log("Email:", admin.email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error("Seeder Error:", error);
    process.exit(1);
  }
}

seedAdmin();