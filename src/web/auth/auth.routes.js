const router = require("express").Router();
const auth = require("../../middleware/userAuth.middleware");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  profile,
  logout,
  getUsers
} = require("./auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", auth, profile);
router.post("/logout", logout);
router.get("/users", auth, getUsers);

module.exports = router;
