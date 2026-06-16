const router = require("express").Router();
// const auth = require("../../middleware/auth");
const {
  getCourses,
  getCourseDetails,
} = require("./literature.controller");

router.get("/", getCourses);

router.get("/:id", getCourseDetails);

module.exports = router;