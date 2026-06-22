const router = require("express").Router();

const {
  createCourseMarketplace,
  getCourseMarketplace,
  getCourseMarketplaceById,
  updateCourseMarketplace,
  deleteCourseMarketplace,
} = require("./courseMarketplace.controller");

router.post("/", createCourseMarketplace);

router.get("/", getCourseMarketplace);

router.get("/:id", getCourseMarketplaceById);

router.put("/:id", updateCourseMarketplace);

router.delete("/:id", deleteCourseMarketplace);

module.exports = router;