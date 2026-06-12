const bcrypt = require("bcryptjs");
const Admin = require("./profile.model");

// CREATE ADMIN
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exist = await Admin.findOne({ email });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ADMINS
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE ADMIN
exports.getSingleAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
      .select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE ADMIN
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email, isSuperAdmin } = req.body;

    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    if (typeof isSuperAdmin === "boolean") {
      admin.isSuperAdmin = isSuperAdmin;
    }

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: admin,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE ADMIN
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(
      req.params.id
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
