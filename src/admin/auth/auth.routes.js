const router = require("express").Router();
const { login, profile } = require("./auth.controller");
const adminAuth = require("../../middleware/auth.middleware");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin Route Working"
  });
});

router.post("/login", login);
router.get("/profile", adminAuth, profile);

module.exports = router;
