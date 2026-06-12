const router = require("express").Router();
const { getLandingPage } = require("./landing.controller");

router.get("/", getLandingPage);

module.exports = router;
