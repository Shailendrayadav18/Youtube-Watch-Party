import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (!roomId || !username) return;
    navigate(`/room/${roomId}?username=${username}`);
  };

  const createRoom = () => {
    const newRoom = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${newRoom}?username=${username}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>YouTube Watch Party 🎬</h1>

      <input
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Enter Room ID"
        onChange={(e) => setRoomId(e.target.value)}
      />

      <br /><br />

      <button onClick={joinRoom}>Join Room</button>
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
}