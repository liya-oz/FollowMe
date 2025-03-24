import { useState } from "react";
import socket from "../socket";

const ChatMessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    // it is Fady's fake account's ID
    const recipientId = "neHgVT_nEfQmvGX3AAAD";

    socket.emit("private_message", {
      to: recipientId,
      content: trimmed,
    });

    setMessage("");
  };

  return (
    <div style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "80%" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatMessageInput;

//EVENTS:
//
//  typing, stop_typing, private_message (emit)
