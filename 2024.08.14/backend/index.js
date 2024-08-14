import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

// Initialize an Express app
const app = express();

// Enable CORS for the express app to allow requests from different origins
app.use(cors());

// Create an HTTP server using the Express App
const server = http.createServer(app);

// Create a new instance of socket.io and attach it to the http server
const io = new Server(server, {
  // Configuring CORS settings to allow connections from the specified origin (e.g., a frontend running on localhost:5173).
  cors: {
    origin: "http://localhost:5174",
  },
});

// Set up a listener for when a client connects to the server via socket.io
io.on("connection", (socket) => {
  console.log("A user has connected", socket.id);

  // Listening for a 'join_room' event from the client, which includes data (the room number).
  // When the event is received, the socket joins the specified room.
  socket.on("join_room", (room) => {
    socket.join(room);

    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  // Listening for a 'send_message' event from the client, which includes the message data.
  socket.on("send_message", (messageData) => {
    socket.to(messageData.room).emit("receive_message", messageData); // Emitting the received message to all clients in the specified room, except the sender.
  });

  // Listen for the "disconnect" event, which triggers when a client disconnects
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const port = process.env.PORT || 3007;
server.listen(port, () => console.log(`Server is running on port ${port}`));
