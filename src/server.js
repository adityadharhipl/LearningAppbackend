require("dotenv").config();

const app = require("./app");

const connectDB = require(
  "./config/db"
);

connectDB();

app.listen(
  process.env.PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Server Running On Port ${process.env.PORT}`
    );
  }
);

// app.listen(
//   process.env.PORT,
//   () => {
//     console.log(
//       `Server Running On Port ${process.env.PORT}`
//     );
//   }
// );