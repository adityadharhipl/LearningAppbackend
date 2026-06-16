const router = require("express").Router();

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("./LiteratureCourse.controller");

router.post("/", createCourse);

router.get("/", getCourses);

router.get("/:id", getCourseById);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

module.exports = router;