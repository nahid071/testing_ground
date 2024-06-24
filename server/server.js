const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5005;
const DB_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });
});

const testRoutes = require("./routes/test");

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express server with MongoDB!");
});

// Use routes
app.use("/test", testRoutes);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
