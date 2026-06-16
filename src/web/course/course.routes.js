// web/course/course.routes.js

const router = require("express").Router();

const {
  getCourses,
  getCourseDetails,
} = require("./course.controller");

router.get("/", getCourses);

router.get("/:id", getCourseDetails);

module.exports = router;