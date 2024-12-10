const io = require("socket.io-client");
const { exec } = require("child_process");

const openUrl = (url) => {
  const platform = process.platform;

  let command;

  if (platform === "win32") {
    command = `start ${url}`;
  } else if (platform === "darwin") {
    command = `open ${url}`;
  } else {
    command = `xdg-open ${url}`;
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Error opening browser: ${error}`);
    } else {
      console.log("Browser opened successfully");
    }
  });
};

const server_url = "http://45.63.76.217:8080";
// const server_url = "http://localhost:3000";
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
  openUrl("https://www.google.com/ncr");
});
