const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
  }
);
const literatureCourseSchema = new mongoose.Schema(
  {
    courses: {
      type: [courseSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model(
  "LiteratureCourse",
  literatureCourseSchema
);