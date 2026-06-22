// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema(
//   {
//     image: {
//       type: String,
//       required: true,
//     },

//     courseName: {
//       type: String,
//       required: true,
//     },

//     title: {
//       type: String,
//       required: true,
//     },

//     slug: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     _id: true,
//   }
// );
// const literatureCourseSchema = new mongoose.Schema(
//   {
//     courses: {
//       type: [courseSchema],
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// module.exports = mongoose.model(
//   "LiteratureCourse",
//   literatureCourseSchema
// );


const mongoose = require("mongoose");


// ── Lesson Schema (for Curriculum) ──
const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String },
    isPreview: { type: Boolean, default: false },
  },
  { _id: true }
);


// ── Curriculum Section Schema ──
const curriculumSectionSchema = new mongoose.Schema(
  {
    sectionTitle: { type: String, required: true },
    lessons: [lessonSchema],
  },
  { _id: true }
);


// ── Instructor Schema ──
const instructorSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String },
    designation: { type: String },
    bio: { type: String },
    rating: { type: Number },
    reviewCount: { type: Number },
    studentCount: { type: Number },
    courseCount: { type: Number },
  },
  { _id: false }
);


// ── FAQ Schema ──
const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: true }
);


// ── Related Course Schema ──
const relatedCourseSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String },
    authorName: { type: String },
    price: { type: Number },
    oldPrice: { type: Number },
    rating: { type: Number },
    reviewCount: { type: Number },
  },
  { _id: true }
);


// ── Course Feature / Includes Schema ──
const courseFeatureSchema = new mongoose.Schema(
  {
    icon: { type: String },
    label: { type: String },
    value: { type: String },
  },
  { _id: false }
);


// ── Main Course Schema (with Detail Page fields) ──
const courseSchema = new mongoose.Schema(
  {
    // ─── Card / Listing Fields ───
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
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

    // ─── Detail Page Fields ───
    bannerImage: { type: String },
    category: { type: String },
    price: { type: Number },
    oldPrice: { type: Number },
    duration: { type: String },
    lessonCount: { type: Number },
    studentCount: { type: Number },
    rating: { type: Number },
    reviewCount: { type: Number },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
      default: "All Levels",
    },
    language: { type: String, default: "English" },
    lastUpdated: { type: Date },

    // Overview / Description
    overview: { type: String },
    description: { type: String },
    whatYouWillLearn: [{ type: String }],

    // Curriculum
    curriculum: [curriculumSectionSchema],

    // Instructor
    instructor: instructorSchema,

    // Course Features / Includes
    courseIncludes: [courseFeatureSchema],

    // FAQ
    faq: [faqSchema],

    // Related Courses
    relatedCourses: [relatedCourseSchema],

    // Marketing Banner
    marketingBanner: {
      title: { type: String },
      description: { type: String },
      buttonText: { type: String },
      buttonLink: { type: String },
      image: { type: String },
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