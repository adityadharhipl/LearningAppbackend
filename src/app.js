const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs")

const app = express();

app.use(express.json());


 app.use(cors({
  origin: "http://localhost:5001",
  credentials: false
}));


app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



const swaggerDocument = YAML.load("src/swagger/swagger.yaml");
app.get("/", (req, res) => {
  res.send("API Running");
});

/* =========================
   ADMIN ROUTES
========================= */

// Auth
const adminAuthRoutes = require("./admin/auth/auth.routes");

// Profile
const adminProfileRoutes = require("./admin/profile/profile.routes");

// Blogs
const adminBlogRoutes = require("./admin/blog/blog.routes");

// Landing
const adminLandingRoutes = require("./admin/landing/landing.routes");

// Courses
const adminCourseRoutes = require("./admin/course/course.routes");

// Literature Courses
const adminLiteratureRoutes = require(
  "./admin/LiteratureCourse/LiteratureCourse.route"
);

// Course Landing Page
const adminCourseLandingPageRoutes = require(
  "./admin/courseLandingPage/courseLandingPage.routes"
);

// Book Store Course
const adminBookStoreCourseRoutes = require(
  "./admin/bookStoreCourse/bookStoreCourse.routes"
);

// Course Marketplace
const adminCourseMarketplaceRoutes = require(
  "./admin/courseMarketplace/courseMarketplace.routes"
);

// Centralized Admin Routes
const adminRoutes = require("./routes/admin.routes");

/* =========================
   WEB ROUTES
========================= */

// Auth
const webAuthRoutes = require("./web/auth/auth.routes");

// Landing
const webLandingRoutes = require("./web/landing/landing.routes");

// Courses
const webCourseRoutes = require("./web/course/course.routes");

// Course Landing Page
const webCourseLandingPageRoutes = require(
  "./web/landingCourse/courseLandingPage.routes"
);

// Literature Courses
const webLiteratureRoutes = require(
  "./web/literatureCourse/literature.routes"
);

// Book Store Course
const webBookStoreCourseRoutes = require(
  "./web/bookStoreCourse/bookStoreCourse.routes"
);

// Course Marketplace
const webCourseMarketplaceRoutes = require(
  "./web/courseMarketplace/courseMarketplace.routes"
);

// Newsletter
const newsletterRoutes = require(
  "./web/newsletter/newsletter.routes"
);

// Meeting
const meetingRoutes = require(
  "./web/MeetingModel/meeting.routes"
);

// Centralized Web Routes
const webRoutes = require("./routes/web.routes");

/* =========================
   ADMIN API
========================= */

app.use("/api/v1/admin/auth", adminAuthRoutes);
app.use("/api/v1/admin/profile", adminProfileRoutes);
app.use("/api/v1/admin/blogs", adminBlogRoutes);
app.use("/api/v1/admin/landing", adminLandingRoutes);
app.use("/api/v1/admin/courses", adminCourseRoutes);

app.use(
  "/api/v1/admin/literature-courses",
  adminLiteratureRoutes
);

app.use(
  "/api/v1/admin/course-landing-page",
  adminCourseLandingPageRoutes
);

app.use(
  "/api/v1/admin/book-store-course",
  adminBookStoreCourseRoutes
);

app.use(
  "/api/v1/admin/course-marketplace",
  adminCourseMarketplaceRoutes
);

app.use("/api/v1/admin", adminRoutes);

/* =========================
   WEB API
========================= */

app.use("/api/v1/web/auth", webAuthRoutes);
app.use("/api/v1/web/landing", webLandingRoutes);
app.use("/api/v1/web/courses", webCourseRoutes);

app.use(
  "/api/v1/web/course-landing-page",
  webCourseLandingPageRoutes
);

app.use(
  "/api/v1/web/literature-courses",
  webLiteratureRoutes
);

app.use(
  "/api/v1/web/book-store-course",
  webBookStoreCourseRoutes
);

app.use(
  "/api/v1/web/course-marketplace",
  webCourseMarketplaceRoutes
);

app.use(
  "/api/v1/web/newsletter",
  newsletterRoutes
);

app.use("/api/v1/web", webRoutes);

/* =========================
   COMMON ROUTES
========================= */

app.use("/api/v1/meeting", meetingRoutes);
// swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

module.exports = app;


