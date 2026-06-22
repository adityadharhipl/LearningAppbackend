const router = require("express").Router();

const {
  getCourseMarketplace,
  getCourseMarketplaceById,
  searchCourses
} = require("./courseMarketplace.controller");

router.get("/", getCourseMarketplace);
router.post("/search", searchCourses);

router.get("/:id", getCourseMarketplaceById);

module.exports = router;