
// courseLandingPage.controller.js

const CourseLandingPage = require("./courseLandingPage.model");

// Create
exports.createCourseLandingPage = async (req, res) => {
  try {
    const page = await CourseLandingPage.create(req.body);

    res.status(201).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Latest Landing Page
exports.getCourseLandingPage = async (req, res) => {
  try {
    const page = await CourseLandingPage.findOne().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
exports.updateCourseLandingPage = async (req, res) => {
  try {
    const page = await CourseLandingPage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
exports.deleteCourseLandingPage = async (req, res) => {
  try {
    console.log("Delete ID:", req.params.id);

    const page = await CourseLandingPage.findByIdAndDelete(
      req.params.id
    );

    console.log("Deleted Data:", page);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};