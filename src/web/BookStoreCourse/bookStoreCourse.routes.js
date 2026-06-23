const express = require("express");
const router = express.Router();

const controller = require(
    "./bookStoreCourse.controller"
);

router.get(
    "/",
    controller.getBookStoreCourses
);

router.get(
    "/:id",
    controller.getBookStoreCourseById
);

module.exports = router;