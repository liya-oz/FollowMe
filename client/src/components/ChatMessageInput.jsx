import { useState } from "react";
import socket from "../socket";
import PropTypes from "prop-types";

const ChatMessageInput = ({ selectedFriendId }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || !selectedFriendId) return;

    socket.emit("private_message", {
      to: selectedFriendId,
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

ChatMessageInput.propTypes = {
  selectedFriendId: PropTypes.string.isRequired,
};

export default ChatMessageInput;

//EVENTS:
//
//  typing, stop_typing, private_message (emit)
