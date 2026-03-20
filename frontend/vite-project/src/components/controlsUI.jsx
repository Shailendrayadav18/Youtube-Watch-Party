export default function ControlsUI({ role, socket, roomId, currentIndex, setCurrentIndex, videoList, playerRef }) {
  if (role === "participant") return null;

  const getTime = () => {
    return playerRef?.current?.getCurrentTime() || 0;
  };

  const handleNextVideo = () => {
    const nextIndex = (currentIndex + 1) % videoList.length;

    setCurrentIndex(nextIndex);

    socket.emit("change_video", {
      roomId,
      videoId: videoList[nextIndex]
    });
  };

  return (
    <div style={{marginTop: "10px"}}>
      <button onClick={() =>
        socket.emit("play", { roomId, time: getTime() })
      }>
        Play
      </button>
      &nbsp;&nbsp;
      <button onClick={() =>
        socket.emit("pause", { roomId, time: getTime() })
      }>
        Pause
      </button>
      &nbsp;&nbsp;
      <button onClick={() =>
        socket.emit("seek", { roomId, time: getTime() + 10 })
      }>
        Seek 10s
      </button>
      &nbsp;&nbsp;
      <button
        onClick={() =>
          socket.emit("seek", {
            roomId,
            time: Math.max(0, getTime() - 10)
          })
        }
      >
        Seek -10s
      </button>
      &nbsp;&nbsp;
      <button onClick={handleNextVideo}>
        Next Video
      </button>
    </div>
  );
}