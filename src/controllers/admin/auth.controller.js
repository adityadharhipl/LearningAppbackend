const User = require("../../models/User");
const generateToken = require("../../utils/generateToken");
const bcrypt = require("bcryptjs");
const Admin = require("../../models/Admin");
const generateAdminToken = require("../../utils/generateAdminToken");

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, Email and Password are required",
//       });
//     }

//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email format",
//       });
//     }

//     // Password length validation
//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters long",
//       });
//     }

//     // Check existing admin
//     const exist = await Admin.findOne({ email });

//     if (exist) {
//       return res.status(409).json({
//         success: false,
//         message: "Admin already exists",
//       });
//     }

//     // Hash password
//     const hash = await bcrypt.hash(password, 10);

//     // Create admin
//     const admin = await Admin.create({
//       name,
//       email,
//       password: hash,
//     });

//     // Remove password from response
//     const adminData = admin.toObject();
//     delete adminData.password;

//     return res.status(201).json({
//       success: true,
//       message: "Admin registered successfully",
//       admin: adminData,
//     });

//   } catch (error) {
//     console.error("Register Error:", error);

//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already registered",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: process.env.NODE_ENV === "development"
//         ? error.message
//         : undefined,
//     });
//   }
// };



// for login 


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Check Admin
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Compare Password
    const match = await bcrypt.compare(
      password,
      admin.password
    );

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate Token
    const token = generateAdminToken(admin._id);

    // Remove password from response
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
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};


exports.profile = async (
  req,
  res
) => {

  res.json({
    success:true,
    data:req.admin
  });

};

