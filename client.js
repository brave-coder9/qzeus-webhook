const io = require("socket.io-client");
const socket = io("https://qzeus-webhook.vercel.app");

socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("qzeus-webhook", (payload) => {
  console.log("Received webhook event: ", payload);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});
