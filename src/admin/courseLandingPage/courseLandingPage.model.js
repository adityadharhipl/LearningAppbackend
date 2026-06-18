const mongoose = require("mongoose");


const courseCardSchema = new mongoose.Schema(
  {
    image: String,
    category: String,
    duration: String,
    title: String,
    description: String,
    authorName: String,
    authorImage: String,
    price: Number,
    oldPrice: Number,
  },
  {
    _id: false,
  }
);


const courseLandingPageSchema = new mongoose.Schema(
  {

    // Section 1
    // Welcome back, ready for your next lesson?
    welcomeBanner: {
      title: String,
      subtitle: String,
      description: String,
      buttonText: String,
      buttonLink: String,
      image: String,
    },


    // Section 2
    // Premium React Study For Your Next Level
    premiumReactStudy: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 3
    // Choice Favourite Course From Top Category
    choiceFavouriteCourse: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 4
    // Recommended For You
    recommendedForYou: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 5
    // Get Choice Of Your Course
    getChoiceOfYourCourse: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 6
    // Online Coaching Lessons For Remote Learning
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
    // The Course In Personal Development
    personalDevelopmentCourse: {
      title: String,
      subtitle: String,
      cards: [courseCardSchema],
    },


    // Section 8
    // Students Are Viewing
    studentsAreViewing: {
      title: String,
      cards: [courseCardSchema],
    },


    // Section 9
    // Online Course Includes
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
    // Recent Article For You
    recentArticleForYou: {
      title: String,
      cards: [courseCardSchema],
    },


    // Section 11
    // Best Deals Of Your Choice
    bestDealsOfYourChoice: {
      title: String,
      cards: [courseCardSchema],
    },


    // Section 12
    // Statistics Banner
    statisticsBanner: {
      students: Number,
      courses: Number,
      instructors: Number,
      certificates: Number,
    },


    // Section 13
    // Featured Articles
    featuredArticles: {
      title: String,
      cards: [courseCardSchema],
    },


    // Section 14
    // Latest Courses
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