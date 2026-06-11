const router =
require("express").Router();

const {
 getLandingPage
} = require(
 "../../controllers/web/landing.controller"
);

router.get(
 "/",
 getLandingPage
);

module.exports = router;