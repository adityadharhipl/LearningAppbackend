const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      default: 0
    }
  },
  {
    _id: true
  }
);

const BookStoreCourseSchema = new mongoose.Schema(
  {
    heroSection: {
      bannerImage: {
        type: String,
        default: ""
      },

      instructor: {
        image: {
          type: String,
          default: ""
        },

        name: {
          type: String,
          default: ""
        },

        designation: {
          type: String,
          default: ""
        },

        description: {
          type: String,
          default: ""
        },

        rating: {
          type: String,
          default: ""
        },

        stats: {
          learningHours: {
            type: String,
            default: ""
          },

          students: {
            type: String,
            default: ""
          },

          courses: {
            type: String,
            default: ""
          }
        },

        socialLinks: {
          facebook: {
            type: String,
            default: ""
          },

          twitter: {
            type: String,
            default: ""
          },

          linkedin: {
            type: String,
            default: ""
          },

          youtube: {
            type: String,
            default: ""
          },

          instagram: {
            type: String,
            default: ""
          }
        },

        enrollButtonText: {
          type: String,
          default: "Enroll Now"
        },

        buttonText: {
          type: String,
          default: "Enroll Now"
        },

        buttonLink: {
          type: String,
          default: ""
        }
      }
    },

    tabs: [
      {
        type: String
      }
    ],

    bookSection: {
      title: {
        type: String,
        default: "Literature Course"
      },

      books: [BookSchema]
    },

    pagination: {
      currentPage: {
        type: Number,
        default: 1
      },

      totalPages: {
        type: Number,
        default: 1
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "BookStoreCourse",
  BookStoreCourseSchema
);