const router = require("express").Router();

const {
  getCourses,
  getCourseDetails,
} = require("./literature.controller");

router.get("/", getCourses);

router.get("/:id", getCourseDetails);

module.exports = router;