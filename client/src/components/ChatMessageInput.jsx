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
    <div style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "80%" }}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

ChatMessageInput.propTypes = {
  selectedFriendId: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default ChatMessageInput;
