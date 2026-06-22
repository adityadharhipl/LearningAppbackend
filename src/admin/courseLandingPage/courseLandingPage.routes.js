// courseLandingPage.routes.js

const express = require("express");
const router = express.Router();

const {
  createCourseLandingPage,
  getCourseLandingPage,
  updateCourseLandingPage,
  deleteCourseLandingPage,
   getCourseLandingPageById,
} = require("./courseLandingPage.controller");

router.post("/", createCourseLandingPage);
router.get("/", getCourseLandingPage);
router.get("/:id", getCourseLandingPageById);
router.put("/:id", updateCourseLandingPage);
router.delete("/:id", deleteCourseLandingPage);

module.exports = router;