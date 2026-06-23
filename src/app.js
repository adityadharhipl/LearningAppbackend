const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running");
});



// Auth
const adminAuthRoutes = require("./admin/auth/auth.routes");
app.use("/api/v1/admin/auth", adminAuthRoutes);

// Profile
const adminProfileRoutes = require("./admin/profile/profile.routes");
app.use("/api/v1/admin/profile", adminProfileRoutes);

// Blogs
const adminBlogRoutes = require("./admin/blog/blog.routes");
app.use("/api/v1/admin/blogs", adminBlogRoutes);

// Landing
const adminLandingRoutes = require("./admin/landing/landing.routes");
app.use("/api/v1/admin/landing", adminLandingRoutes);

// Courses
const adminCourseRoutes = require("./admin/course/course.routes");
app.use("/api/v1/admin/courses", adminCourseRoutes);

// Literature Courses
const adminLiteratureRoutes = require(
  "./admin/LiteratureCourse/LiteratureCourse.route"
);

const courseLandingPageRoutes = require(
  "./admin/courseLandingPage/courseLandingPage.routes"
);

app.use(
  "/api/v1/admin/course-landing-page",
  courseLandingPageRoutes
);

app.use(
  "/api/v1/admin/literature-courses",
  adminLiteratureRoutes
);


app.use(
    "/api/v1/admin/book-store-course",
    require(
        "./admin/bookStoreCourse/bookStoreCourse.routes"
    )
);

app.use(
  "/api/v1/meeting",
  require("./web/MeetingModel/meeting.routes")
);

app.use(
    "/api/v1/web/book-store-course",
    require(
        "./web/bookStoreCourse/bookStoreCourse.routes"
    )
);
// Auth
const webAuthRoutes = require("./web/auth/auth.routes");
app.use("/api/v1/web/auth", webAuthRoutes);

// Landing
const webLandingRoutes = require("./web/landing/landing.routes");
app.use("/api/v1/web/landing", webLandingRoutes);

// Courses
const webCourseRoutes = require("./web/course/course.routes");
app.use("/api/v1/web/courses", webCourseRoutes);

// Course Landing Page Web
const webCourseLandingPageRoutes = require(
  "./web/landingCourse/courseLandingPage.routes"
);

const courseMarketplaceRoutes = require(
  "./admin/courseMarketplace/courseMarketplace.routes"
);

app.use(
  "/api/v1/admin/course-marketplace",
  courseMarketplaceRoutes
);

app.use(
  "/api/v1/web/course-landing-page",
  webCourseLandingPageRoutes
);

const newsletterRoutes = require("./web/newsletter/newsletter.routes");

app.use("/api/v1/web/newsletter", newsletterRoutes);
const webLiteratureRoutes = require(
  "./web/literatureCourse/literature.routes"
);
app.use(
  "/api/v1/web/literature-courses",
  webLiteratureRoutes
);


const webCourseMarketplaceRoutes = require(
  "./web/courseMarketplace/courseMarketplace.routes"
);

app.use(
  "/api/v1/web/course-marketplace",
  webCourseMarketplaceRoutes
);

// Centralized Admin Router
const adminRoutes = require("./routes/admin.routes");
app.use("/api/v1/admin", adminRoutes);


// Centralized Web Router
const webRoutes = require("./routes/web.routes");
app.use("/api/v1/web", webRoutes);


module.exports = app;








































// const express = require("express");
// const cors =  require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("API Running");
// });

// const adminAuthRoutes = require("./admin/auth/auth.routes");
// const adminBlogRoutes = require("./admin/blog/blog.routes");


// const adminProfileRoutes = require("./admin/profile/profile.routes");

// app.use(
//   "/api/v1/admin/auth",
//   adminAuthRoutes
// );
// app.use(
//   "/api/v1/admin/blogs",
//   adminBlogRoutes
// );


// const webAuthRoutes = require("./web/auth/auth.routes");

// app.use(
//  "/api/v1/web/auth",
//  webAuthRoutes
// );



// const adminLandingRoutes =
// require(
//  "./admin/landing/landing.routes"
// );

// const webLandingRoutes =
// require(
//  "./web/landing/landing.routes"
// );

// app.use(
//  "/api/v1/admin/landing",
//  adminLandingRoutes
// );

// app.use(
//  "/api/v1/web/landing",
//  webLandingRoutes
// );



// app.use(
//   "/api/v1/admin/profile",
//   adminProfileRoutes
// );

// // ─────────────────────────────────────────────────────────────────
// // New Modular Routes (modules/blog & modules/membership)
// // ─────────────────────────────────────────────────────────────────

// // Centralized admin router (includes blog + membership admin routes)
// const adminRoutes = require("./routes/admin.routes");
// app.use("/api/v1/admin", adminRoutes);

// // Centralized web router (includes blog + membership web routes)
// const webRoutes = require("./routes/web.routes");
// app.use("/api/v1/web", webRoutes);

// module.exports = app;