import { useEffect, useState, useContext } from "react";
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import PropTypes from "prop-types";
import socket from "../socket";
import { AuthContext } from "../contexts/AuthContext";

const ChatWindow = ({ selectedFriend }) => {
  const [messages, setMessages] = useState([]);
  const { decodedToken } = useContext(AuthContext);
  const currentUserId = decodedToken?.id;

  useEffect(() => {
    setMessages([]);
  }, [selectedFriend]);

  useEffect(() => {
    if (!selectedFriend) return;

    const handlePrivateMessage = (message) => {
      console.log("Получено сообщение:", message);

      setMessages((prev) => [...prev, message]);
    };

    socket.on("private_message", handlePrivateMessage);

    return () => {
      socket.off("private_message", handlePrivateMessage);
    };
  }, [selectedFriend, currentUserId]);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  if (!selectedFriend) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontStyle: "italic", color: "#888" }}>
          Выберите друга, чтобы начать чат
        </p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={selectedFriend.friendId.profilePhoto || "/default-profile.png"}
          alt={selectedFriend.friendId.name}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            marginRight: 10,
          }}
        />
        <strong>{selectedFriend.friendId.name}</strong>
      </div>

      <ChatMessageList
        messages={messages}
        selectedFriendId={selectedFriend.friendId._id}
        currentUserId={currentUserId}
      />
      <ChatMessageInput
        selectedFriendId={selectedFriend.friendId._id}
        onSend={handleSend}
      />
    </div>
  );
};

ChatWindow.propTypes = {
  selectedFriend: PropTypes.object,
};

export default ChatWindow;
