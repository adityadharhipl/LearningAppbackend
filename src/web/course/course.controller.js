

const Course = require('./course.model');
const LiteratureCourse = require('../literatureCourse/literatureCourse.model');
const CourseLandingPage = require('../../admin/courseLandingPage/courseLandingPage.model');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(1);
     console.log(courses,"courses")
    res.status(200).json({
      success: true,
      count: courses.length,
      data: {
        courses: courses?.[0] || null,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    // 1) First search in LiteratureCourse
    const litDoc = await LiteratureCourse.findOne({
      "courses._id": req.params.id,
    });

    if (litDoc) {
      const course = litDoc.courses.id(req.params.id);
      return res.status(200).json({
        success: true,
        data: course,
      });
    }

  
    const landingDoc = await CourseLandingPage.findOne().lean();

    if (landingDoc) {
      for (const key of Object.keys(landingDoc)) {
        const section = landingDoc[key];

        if (
          section &&
          typeof section === "object" &&
          Array.isArray(section.cards)
        ) {
          const card = section.cards.find(
            (c) => String(c._id) === String(req.params.id)
          );

          if (card) {
            return res.status(200).json({
              success: true,
              data: card,
            });
          }
        }
      }
    }

    // 3) Not found anywhere
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};