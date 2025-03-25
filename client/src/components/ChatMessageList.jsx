import { useEffect, useState } from "react";
import socket from "../socket";
import PropTypes from "prop-types";

const ChatMessageList = ({ selectedFriendId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
  }, [selectedFriendId]);

  useEffect(() => {
    const handleMessage = (msg) => {
      if (msg.from === selectedFriendId || msg.to === selectedFriendId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("private_message", handleMessage);
    return () => {
      socket.off("private_message", handleMessage);
    };
  }, [selectedFriendId]);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            marginBottom: "8px",
            textAlign: msg.from === selectedFriendId ? "left" : "right",
          }}
        >
          <strong>
            {msg.from === selectedFriendId ? selectedFriendId : "You"}:
          </strong>{" "}
          {msg.content}
        </div>
      ))}
    </div>
  );
};

ChatMessageList.propTypes = {
  selectedFriendId: PropTypes.string.isRequired,
};

export default ChatMessageList;
