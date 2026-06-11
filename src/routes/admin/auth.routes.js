const router =
  require("express").Router();

const {
  // register,
  login,
  profile
} = require(
  "../../controllers/admin/auth.controller"
);

const adminAuth =
  require("../../middlewares/adminAuth");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message:
      "Admin Route Working"
  });
});

// router.post(
//   "/register",
//   register
// );

router.post(
  "/login",
  login
);

router.get(
  "/profile",
  adminAuth,
  profile
);

module.exports = router;