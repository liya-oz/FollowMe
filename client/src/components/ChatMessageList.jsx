import { useEffect, useState } from "react";
import socket from "../socket";

const ChatMessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("private_message", handleMessage);

    return () => {
      socket.off("private_message", handleMessage);
    };
  }, []);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          <strong>{msg.from === msg.to ? "You (self)" : msg.from}:</strong>{" "}
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;
