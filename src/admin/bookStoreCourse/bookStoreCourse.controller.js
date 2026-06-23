const BookStoreCourse = require("./bookStoreCourse.model");

// Create
exports.create = async (req, res) => {
  try {
    console.log(
      JSON.stringify(req.body, null, 2)
    );

    const data = await BookStoreCourse.create(
      req.body
    );

    res.status(201).json({
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

// Get All
exports.getAll = async (req, res) => {
    try {
        const data = await BookStoreCourse.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get By Id
exports.getById = async (req, res) => {
    try {
        const data = await BookStoreCourse.findById(
            req.params.id
        );

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Book Store Course not found",
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

// Update
exports.update = async (req, res) => {
    try {
        const data =
            await BookStoreCourse.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Book Store Course not found",
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

// Delete
exports.delete = async (req, res) => {
    try {
        const data =
            await BookStoreCourse.findByIdAndDelete(
                req.params.id
            );

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Book Store Course not found",
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