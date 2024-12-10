const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
