import { useEffect, useState } from "react";

export default function ChatUI({ socket, roomId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off();
  }, []);

  return (
    <div className="chat" style={{ width: "300px" }}>
      <h3>Chat</h3>
      {messages.map((m, i) => (
        <p key={i}><b>{m.user}</b>: {m.message}</p>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={() => {
        socket.emit("send_message", { roomId, message: input });
        setInput("");
      }}>
        Send
      </button>
    </div>
  );
}