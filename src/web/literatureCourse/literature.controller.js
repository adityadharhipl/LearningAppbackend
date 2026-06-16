const LiteratureCourse = require("./literatureCourse.model");

exports.getCourses = async (req, res) => {
  try {
    const docs = await LiteratureCourse.find().sort({
      createdAt: -1,
    });

    const allCourses = docs.flatMap((doc) => doc.courses);

    res.status(200).json({
      success: true,
      count: allCourses.length,
      courses: allCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseDetails = async (
  req,
  res
) => {
  try {
    const course =
      await LiteratureCourse.findById(
        req.params.id
      );

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