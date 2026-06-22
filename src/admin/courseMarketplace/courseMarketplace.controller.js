const CourseMarketplace = require(
  "./courseMarketplace.model"
);

exports.createCourseMarketplace = async (
  req,
  res
) => {
  try {
    const data = await CourseMarketplace.create(
      req.body
    );
     console.log(data,"data")
    res.status(201).json({ success: true, data, });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseMarketplace = async (
  req,
  res
) => {
  try {
    const data = await CourseMarketplace.findOne()
      .sort({
        createdAt: -1,
      });
  console.log(data ,"`111111111111111111111111111111111111111111111111111111111111111111======>`")
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseMarketplaceById =
  async (req, res) => {
    try {
      const data =
        await CourseMarketplace.findById(
          req.params.id
        );

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.updateCourseMarketplace =
  async (req, res) => {
    try {
      const data =
        await CourseMarketplace.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.deleteCourseMarketplace =
  async (req, res) => {
    try {
      await CourseMarketplace.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message: "Deleted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };