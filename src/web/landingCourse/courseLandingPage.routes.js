

const router = require("express").Router();


const {
  getCourseLandingPage,
  getCourseLandingPageById

} = require("./courseLandingPage.controller");



// Homepage API
router.get(
  "/",
  getCourseLandingPage
);


// Details API
router.get(
  "/:id",
  getCourseLandingPageById
);



module.exports = router;