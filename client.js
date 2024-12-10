const io = require("socket.io-client");
// const server_url = "https://qzeus-webhook.vercel.app";
const server_url = "http://localhost:3000";
const socket = io(server_url, {
  reconnect: true,
});

socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("qzeus-webhook", (payload) => {
  console.log("Received webhook event: ", payload);
});
