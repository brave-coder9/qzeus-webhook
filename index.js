const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 4000;

const server = http.createServer(app);

// Socket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Qzeus!");
});
app.post("/", (req, res) => {
  res.send("POST Qzeus!");
});

// Webhook endpoint
app.post("/qzeus/webhook", (req, res, next) => {
  try {
    if (req.method === "POST") {
      const payload = req.body;
      // Handle the payload here
      console.log(payload);

      io.emit("qzeus-webhook", payload);

      // Respond to the webhook request
      res
        .status(200)
        .json({ message: "Webhook received successfully", payload });
    } else {
      res.status(405).json({ message: `Method not allowed: ${req.method}` });
    }
  } catch (error) {
    next(error);
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
