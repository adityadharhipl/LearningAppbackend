const router = require("express").Router();
const adminAuth = require("../../middleware/auth.middleware");
const {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
} = require("./profile.controller");

// Create Admin
router.post(
  "/",
  adminAuth,
  createAdmin
);

// Get All Admins
router.get(
  "/",
  adminAuth,
  getAllAdmins
);

// Get Single Admin
router.get(
  "/:id",
  adminAuth,
  getSingleAdmin
);

// Update Admin
router.put(
  "/:id",
  adminAuth,
  updateAdmin
);

// Delete Admin
router.delete(
  "/:id",
  adminAuth,
  deleteAdmin
);

module.exports = router;
