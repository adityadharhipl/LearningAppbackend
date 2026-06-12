const express = require("express");
const cors =  require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running");
});

const adminAuthRoutes = require("./admin/auth/auth.routes");
const adminBlogRoutes = require("./admin/blog/blog.routes");


const adminProfileRoutes = require("./admin/profile/profile.routes");

app.use(
  "/api/v1/admin/auth",
  adminAuthRoutes
);
app.use(
  "/api/v1/admin/blogs",
  adminBlogRoutes
);


const webAuthRoutes = require("./web/auth/auth.routes");

app.use(
 "/api/v1/web/auth",
 webAuthRoutes
);



const adminLandingRoutes =
require(
 "./admin/landing/landing.routes"
);

const webLandingRoutes =
require(
 "./web/landing/landing.routes"
);

app.use(
 "/api/v1/admin/landing",
 adminLandingRoutes
);

app.use(
 "/api/v1/web/landing",
 webLandingRoutes
);



app.use(
  "/api/v1/admin/profile",
  adminProfileRoutes
);

// ─────────────────────────────────────────────────────────────────
// New Modular Routes (modules/blog & modules/membership)
// ─────────────────────────────────────────────────────────────────

// Centralized admin router (includes blog + membership admin routes)
const adminRoutes = require("./routes/admin.routes");
app.use("/api/v1/admin", adminRoutes);

// Centralized web router (includes blog + membership web routes)
const webRoutes = require("./routes/web.routes");
app.use("/api/v1/web", webRoutes);

module.exports = app;