const mongoose = require("mongoose");

const courseCardSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },

    image: String,
    category: String,
    duration: String,
    title: String,
    description: String,

    authorName: String,
    authorImage: String,

    read_lession: String,
    total_lessons: String,

    price: Number,
    oldPrice: Number,
  },
  {
    _id: true,
  }
);


const courseLandingPageSchema = new mongoose.Schema(
  {


    welcomeBanner: {
      title: String,
      subtitle: String,
      read_lession: String,
      total_lessons: String,
      cards: [courseCardSchema],
    },



    premiumReactStudy: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },



    choiceFavouriteCourse: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 4

    recommendedForYou: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 5

    getChoiceOfYourCourse: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 6

    onlineCoachingLessons: {
      title: String,
      subtitle: String,
      description: String,
      image: String,
      videoUrl: String,
      buttonText: String,
      buttonLink: String,
    },


    // Section 7

    personalDevelopmentCourse: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 8

    studentsAreViewing: {
      title: String,
      cards: [courseCardSchema],
    },


    // Section 9

    onlineCourseIncludes: {
      title: String,

      items: [
        {
          title: String,
          icon: String,
          description: String,
        },
      ],
    },


    // Section 10

    recentArticleForYou: {
      title: String,
      cards: [courseCardSchema],
    },


    // Section 11

    bestDealsOfYourChoice: {
      title: String,
      cards: [courseCardSchema],
    },


    // Section 12

    statisticsBanner: {
      students: Number,
      courses: Number,
      instructors: Number,
      certificates: Number,
    },


    // Section 13

    featuredArticles: {
      title: String,
      cards: [courseCardSchema],
    },


    // Section 14

    latestCourses: {
      title: String,
      cards: [courseCardSchema],
    },

  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model(
  "CourseLandingPage",
  courseLandingPageSchema
);