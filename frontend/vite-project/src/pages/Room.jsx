import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { socket } from "../socket";

import VideoPlayer from "../components/videoPlayer";
import ControlsUI from "../components/controlsUI";
import Participants from "../components/participants";
import ChatUI from "../components/chatUI";

export default function Room() {
  const playerRef = useRef(null);
  const videoList = [
    "dQw4w9WgXcQ",
    "3JZ_D3ELwOQ",
    "L_jWHffIx5E",
    "kxopViU98Xo",
    "9bZkp7q19f0",
    "fLexgOxsZu0"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const { roomId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const username = query.get("username");

  const [participants, setParticipants] = useState({});
  const [role, setRole] = useState("participant");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("My socket ID:", socket.id);
      socket.emit("join_room", { roomId, username });
    });

    socket.on("user_joined", (data) => {
      console.log("Participants:", data.participants);
      setParticipants({ ...data.participants });

      if (data.participants[socket.id]) {
        setRole(data.participants[socket.id].role);
      }
    });

    socket.on("role_assigned", (data) => {
      setParticipants({ ...data.participants });

      if (data.participants[socket.id]) {
        setRole(data.participants[socket.id].role);
      }
    });

    socket.on("participant_removed", (data) => {
      setParticipants({ ...data.participants });
    });

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Room: {roomId}</h2>

      <VideoPlayer ref={playerRef} socket={socket} />

      <ControlsUI role={role} socket={socket} roomId={roomId}
        currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}
        videoList={videoList} playerRef={playerRef}
      />

      <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>

        {/* 👥 Participants */}
        <Participants
          participants={participants}
          currentUser={{ id: socket.id, role }}
          socket={socket}
          roomId={roomId}
        />

        <ChatUI socket={socket} roomId={roomId} />
      </div>
    </div>
  );
}