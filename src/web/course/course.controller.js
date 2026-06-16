// web/course/course.controller.js


const Course = require('./course.model');

// exports.getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().sort({
//       createdAt: -1,
//     });

//     res.status(200).json({
//       success: true,
//       count: courses.length,
//       data: courses,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(1);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: {
        courses: courses[0] || null,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET /api/v1/web/courses/:id
exports.getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};