const initializeSocket = (io) => {
  // Store connected users mapping: userId -> socketId
  const connectedUsers = new Map();

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // When a user connects and identifies themselves (e.g., after login on frontend)
    socket.on("register", (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
      
      // Broadcast that this user is online
      io.emit("user_status", { userId, status: "online" });
    });

    // Handle sending a private message between two users
    socket.on("send_message", (data) => {
      // data expects { senderId, receiverId, message, ...otherData }
      const { senderId, receiverId, message } = data;
      const receiverSocketId = connectedUsers.get(receiverId);

      if (receiverSocketId) {
        // Send message to the specific receiver
        io.to(receiverSocketId).emit("receive_message", {
          senderId,
          message,
          timestamp: new Date()
        });
      } else {
        // User is offline
        // IDEA: You could save this message to a MongoDB collection for offline delivery here!
        console.log(`User ${receiverId} is offline. Message could not be delivered instantly.`);
      }
    });

    // Optional: Typing indicators
    socket.on("typing", (data) => {
      const { senderId, receiverId } = data;
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", { senderId });
      }
    });

    socket.on("stop_typing", (data) => {
      const { senderId, receiverId } = data;
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stop_typing", { senderId });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      let disconnectedUserId = null;

      // Find the user who disconnected to remove them from map
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          connectedUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        // Broadcast that this user is offline + Last Seen
        io.emit("user_status", { 
          userId: disconnectedUserId, 
          status: "offline", 
          lastSeen: new Date() 
        });
      }
    });
  });
};

module.exports = initializeSocket;
