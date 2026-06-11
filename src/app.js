const express = require("express");
const cors =  require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running");
});

const adminAuthRoutes = require("./routes/admin/auth.routes");
const adminBlogRoutes = require("./routes/admin/blog.routes");


const adminProfileRoutes = require("./routes/admin/profile.routes");

app.use(
  "/api/v1/admin/auth",
  adminAuthRoutes
);
app.use(
  "/api/v1/admin/blogs",
  adminBlogRoutes
);


const webAuthRoutes = require("./routes/web/auth.routes");

app.use(
 "/api/v1/web/auth",
 webAuthRoutes
);



const adminLandingRoutes =
require(
 "./routes/admin/landing.routes"
);

const webLandingRoutes =
require(
 "./routes/web/landing.routes"
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


module.exports = app;