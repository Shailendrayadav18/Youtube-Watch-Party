const rooms = {};

class Room {
  constructor(roomId, hostId) {
    this.roomId = roomId;
    this.host = hostId;
    this.participants = {};
    this.videoId = "dQw4w9WgXcQ";
    this.currentTime = 0;
    this.isPlaying = false;
    this.chat = [];
  }
}

module.exports = { rooms, Room };