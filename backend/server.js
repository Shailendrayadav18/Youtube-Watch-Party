const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./socket/socketHandler");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin:"*",
  },
  transports: ["websocket"]
});

io.on("connection", (socket) => {
  socketHandler(io, socket);
});

server.listen(PORT, () => console.log("Server running"));