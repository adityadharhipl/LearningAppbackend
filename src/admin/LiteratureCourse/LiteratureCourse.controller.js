const LiteratureCourse = require("./LiteratureCourse.model");

/**
 * Create
 */
exports.createCourse = async (req, res) => {
  try {
    const course = await LiteratureCourse.create({
      courses: req.body.courses,
    });

    res.status(201).json({
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

/**
 * Get All
 */
exports.getCourses = async (req, res) => {
  try {
    const docs = await LiteratureCourse.find().sort({
      createdAt: -1,
    });

    const courses = docs.flatMap((doc) => doc.courses);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Course By Course _id
 */
exports.getCourseById = async (req, res) => {
  try {
    const doc = await LiteratureCourse.findOne({
      "courses._id": req.params.id,
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const course = doc.courses.id(req.params.id);

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

/**
 * Update Parent Document
 */
exports.updateCourse = async (req, res) => {
  try {
    const course = await LiteratureCourse.findByIdAndUpdate(
      req.params.id,
      {
        courses: req.body.courses,
      },
      {
        new: true,
        runValidators: true,
      }
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

/**
 * Delete Parent Document
 */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await LiteratureCourse.findByIdAndDelete(
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
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};