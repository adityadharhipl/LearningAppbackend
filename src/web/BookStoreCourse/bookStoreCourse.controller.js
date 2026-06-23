const BookStoreCourse = require(
    "../../admin/bookStoreCourse/bookStoreCourse.model"
);

// Get All
exports.getBookStoreCourses = async (req, res) => {
  try {
    const data = await BookStoreCourse.findOne()
      .sort({ createdAt: -1 })
      .lean();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Book Store Course not found"
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get By Id
exports.getBookStoreCourseById = async (
    req,
    res
) => {
    try {
        const data =
            await BookStoreCourse.findById(
                req.params.id
            ).lean();

        if (!data) {
            return res.status(404).json({
                success: false,
                message:
                    "Book Store Course not found",
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