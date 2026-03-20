const { rooms, Room } = require("../utils/RoomManager");
const { canControl, isHost } = require("../utils/permissions");

module.exports = (io, socket) => {

  socket.on("join_room", ({ roomId, username }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = new Room(roomId, socket.id);
    }

    const room = rooms[roomId];

    const role = socket.id === room.host ? "host" : "participant";

    room.participants[socket.id] = { username, role };

    socket.join(roomId);

    io.to(roomId).emit("user_joined", {
      participants: room.participants
    });

    socket.emit("sync_state", {
      videoId: room.videoId,
      currentTime: room.currentTime,
      isPlaying: room.isPlaying
    });
  });

  socket.on("play", ({ roomId, time }) => {
    const room = rooms[roomId];
    const user = room.participants[socket.id];

    if (!canControl(user.role)) return;

    room.isPlaying = true;
    room.currentTime = time;

    io.to(roomId).emit("sync_state", {
      videoId: room.videoId,
      currentTime: time,
      isPlaying: true
    });
  });

  socket.on("pause", ({ roomId, time }) => {
    const room = rooms[roomId];
    const user = room.participants[socket.id];

    if (!canControl(user.role)) return;

    room.isPlaying = false;
    room.currentTime = time;

    io.to(roomId).emit("sync_state", {
      videoId: room.videoId,
      currentTime: time,
      isPlaying: false
    });
  });

  socket.on("seek", ({ roomId, time }) => {
    const room = rooms[roomId];
    const user = room.participants[socket.id];

    if (!canControl(user.role)) return;

    room.currentTime = time;

    io.to(roomId).emit("sync_state", {
      videoId: room.videoId,
      currentTime: time,
      isPlaying: room.isPlaying
    });
  });

  socket.on("change_video", ({ roomId, videoId }) => {
    const room = rooms[roomId];
    const user = room.participants[socket.id];

    if (!canControl(user.role)) return;

    room.videoId = videoId;
    room.currentTime = 0;

    io.to(roomId).emit("sync_state", {
      videoId,
      currentTime: 0,
      isPlaying: true
    });
  });

  socket.on("assign_role", ({ roomId, userId, role }) => {
    const room = rooms[roomId];
    const user = room.participants[socket.id];

    if (!isHost(user.role)) return;

    room.participants[userId].role = role;

    io.to(roomId).emit("role_assigned", {
      participants: room.participants
    });
  });

  socket.on("remove_participant", ({ roomId, userId }) => {
    const room = rooms[roomId];

    if (socket.id !== room.host) return;

    delete room.participants[userId];

    io.to(roomId).emit("participant_removed", {
      participants: room.participants
    });
  });

  socket.on("send_message", ({ roomId, message }) => {
    const room = rooms[roomId];

    const msg = {
      user: room.participants[socket.id].username,
      message
    };

    room.chat.push(msg);

    io.to(roomId).emit("receive_message", msg);
  });

};