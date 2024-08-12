import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

// Initialize an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize a new instance of Socket.io by passing the server
// Configure CORS to allow requests from the specified frontend URL
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
  },
});

// Enable CORS for all routes in the Express app
app.use(cors());

// Listen for new socket connections
io.on("connection", (socket) => {
  // Log when a user connects with their socket ID
  console.log("A user has connected", socket.id);

  // Listen for 'message' events from the client
  socket.on("message", (data) => {
    console.log(`Message received: ${data.message} - from user: ${data.id}`);
    io.emit("sendMessage", data); // Broadcast the received message to all connected clients
  });

  // Listen for the 'disconnect' event when a user disconnects
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const port = process.env.PORT || 3006;
// We use server.listen instead of app.listen because we are using the http server.
server.listen(port, () => console.log(`Server is running on port ${port}`));
