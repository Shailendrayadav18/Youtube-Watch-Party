import { io } from "socket.io-client";

export const socket = io("https://youtube-watch-party-m7q9.onrender.com", {
  autoConnect: false,
  transports: ["websocket"]
});