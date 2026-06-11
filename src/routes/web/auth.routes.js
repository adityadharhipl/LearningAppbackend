const router =
require("express").Router();

const auth =
require("../../middlewares/auth");

const {
 register,
 login,
 forgotPassword,
 resetPassword,
 profile,
 logout
} = require(
 "../../controllers/web/auth.controller"
);

router.post(
 "/register",
 register
);

router.post(
 "/login",
 login
);

router.post(
 "/forgot-password",
 forgotPassword
);

router.post(
 "/reset-password/:token",
 resetPassword
);

router.get(
 "/profile",
 auth,
 profile
);

router.post(
  "/logout",
  logout
);


module.exports = router;