const express = require("express");
const router = express.Router();

const meetingController = require(
  "./meeting.controller"
);

router.post(
  "/generate-token",
  meetingController.generateToken
);

module.exports = router;