const router = require("express").Router();
const { login, profile ,getUsers  } = require("./auth.controller");
const adminAuth = require("../../middleware/auth.middleware");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin Route Working"
  });
});

router.post("/login", login);
router.get("/profile", adminAuth, profile);
router.get("/allusers", adminAuth, getUsers);
module.exports = router;
