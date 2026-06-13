require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

connectDB().then(() => {
  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server Running On Port ${process.env.PORT}`);
    console.log(`DB → elearning  |  Collections: admins (admin) + users (web)`);
  });
}).catch((err) => {
  console.error("DB Connection Failed:", err.message);
  process.exit(1);
});