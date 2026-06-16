const express = require("express");
const router = express.Router();

// newsletter.routes.js
const newsletterController = require("./newsletter.controller");


router.post("/subscribe", newsletterController.subscribe);

module.exports = router;