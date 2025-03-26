import { useContext, useState } from "react";
import socket from "../socket";
import { AuthContext } from "../contexts/AuthContext";
import PropTypes from "prop-types";

const ChatMessageInput = ({ selectedFriendId, onSend }) => {
  const [message, setMessage] = useState("");
  const { decodedToken } = useContext(AuthContext);
  const currentUserId = decodedToken?.id;

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || !selectedFriendId) return;

    const msg = {
      to: selectedFriendId,
      content: trimmed,
      from: currentUserId,
    };

    socket.emit("private_message", msg);
    onSend(msg);
    setMessage("");
  };

  return (
    <div
      style={{
        padding: "10px",
        borderTop: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        style={{
          flex: 1,
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          outline: "none",
          fontSize: "14px",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: "8px 16px",
          backgroundColor: "#6e9842",
          color: "white",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Send
      </button>
    </div>
  );
};

ChatMessageInput.propTypes = {
  selectedFriendId: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default ChatMessageInput;
