// models/Course.js

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    // Course Info
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: String,

    thumbnail: String,

    previewVideo: String,

    price: {
      type: Number,
      required: true,
    },

    oldPrice: Number,

    discountPercent: Number,

    duration: String,

    lessons: Number,

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },

    language: String,

    studentsCount: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    // Instructor
    instructor: {
      name: String,
      image: String,
      designation: String,
      bio: String,
      rating: Number,
    },

    // Course Includes
   includes: {
  title: String,

  items: [
    {
      title: String,
      icon: String
    }
  ]
},

    // Reviews
    reviews: [
      {
        userName: String,
        userImage: String,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Marketing Articles
    marketingArticles: [
      {
        image: String,
        category: String,
        duration: String,
        title: String,
        description: String,
        authorName: String,
        authorImage: String,
        oldPrice: Number,
        price: Number,
      },
    ],

    // Classroom Section
    classroomSection: {
      title: String,

      description: String,

      image: String,

      videoUrl: String,

      learnMoreLink: String,
    },

    // Education Offers
    educationOffers: [
      {
        discount: Number,

        title: String,

        description: String,

        image: String,
      },
    ],

    // Social Share
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course", courseSchema);