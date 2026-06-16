// routes/courseRoutes.js

const express = require("express");

const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  addReview,
} = require("../course/course.controller");


// CRUD
router.post("/", createCourse);

router.get("/", getCourses);

router.get("/:id", getCourseById);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);


// Review
router.post("/:id/review", addReview);

module.exports = router;