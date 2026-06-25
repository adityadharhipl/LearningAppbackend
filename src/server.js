require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const http = require("http");
const { Server } = require("socket.io");
const initializeSocket = require("./socket");

connectDB().then(() => {
  const server = http.createServer(app);
  
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust in production
      methods: ["GET", "POST"]
    }
  });

  initializeSocket(io);

  server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server Running On Port ${process.env.PORT}`);
    console.log(`DB → elearning  |  Collections: admins (admin) + users (web)`);
  });
}).catch((err) => {
  console.error("DB Connection Failed:", err.message);
  process.exit(1);
});