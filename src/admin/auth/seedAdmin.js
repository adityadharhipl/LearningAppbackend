require("dotenv").config({ path: require("path").resolve(__dirname, "../../../.env") });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function createAdmin() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/elearning"
    );
    console.log("Connected to DB: elearning");

    const adminSchema = new mongoose.Schema(
      {
        name:         { type: String, required: true, trim: true },
        email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
        password:     { type: String, required: true },
        isSuperAdmin: { type: Boolean, default: true },
      },
      { timestamps: true, collection: "admins" }
    );

    const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

    // ───------- Change credentials here if needed ─────────────
    const ADMIN_EMAIL    = "admin@elearning.com";
    const ADMIN_PASSWORD = "Admin@1234";
    const ADMIN_NAME     = "Super Admin";
    // ────────────────────────────────────────────────-----

    const existing = await Admin.findOne({ email: ADMIN_EMAIL });

    if (existing) {
      console.log(" Admin already exists:", ADMIN_EMAIL);
      await mongoose.disconnect();
      process.exit(0);
    }

    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await Admin.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashed,
      isSuperAdmin: true,
    });

    console.log(" Admin Created!");
    console.log("   DB Collection : elearning → admins");
    console.log("   Email         :", ADMIN_EMAIL);
    console.log("   Password      :", ADMIN_PASSWORD);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error.message);
    process.exit(1);
  }
}

createAdmin();