const router = require("express").Router();
const { login, profile ,getUsers,forgotPassword ,resetPassword } = require("./auth.controller");
const adminAuth = require("../../middleware/auth.middleware");




router.post("/login", login);
router.get("/profile", adminAuth, profile);
router.get("/allusers", adminAuth, getUsers);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/test-mail", async (req, res) => {
  try {
    await sendEmail({
      email: "test@example.com",
      subject: "Testing Mailtrap",
      html: "<h1>Mailtrap Working</h1>",
    });

    res.json({
      success: true,
      message: "Mail Sent Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
