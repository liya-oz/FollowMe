import { useEffect, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import socket from "../socket";
import { AuthContext } from "../contexts/AuthContext";
import defaultUserIcon from "../assets/icons/user-icon.png";
import "../styles/ChatWindow.scss";

const ChatWindow = ({ selectedFriend, onBack }) => {
  const [messages, setMessages] = useState([]);
  const { authToken, decodedToken } = useContext(AuthContext);
  const currentUserId = decodedToken?.id;

  const friend = selectedFriend?.friendId;
  const friendId = friend?._id;
  const friendName = friend?.name;
  const friendProfilePhoto = friend?.profilePhoto || defaultUserIcon;

  useEffect(() => {
    setMessages([]);
  }, [selectedFriend]);

  useEffect(() => {
    if (!selectedFriend || !currentUserId || !authToken) return;
    const loadChatHistory = async () => {
      try {
        const res = await fetch(`/api/chat/history/${friendId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!res.ok) throw new Error("Failed to fetch chat history");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error loading chat history:", err);
      }
    };
    loadChatHistory();
  }, [selectedFriend, currentUserId, authToken, friendId]);

  useEffect(() => {
    if (!selectedFriend) return;
    const handlePrivateMessage = (message) => {
      console.log("Received private message:", message);
      if (message.from === friendId || message.to === friendId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    socket.on("private_message", handlePrivateMessage);
    return () => socket.off("private_message", handlePrivateMessage);
  }, [selectedFriend, friendId]);

  const handleSend = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  if (!selectedFriend) {
    return (
      <div className="chat-placeholder">
        <p>Pick a friend to start chatting!</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={friendProfilePhoto} alt={friendName} />
        <strong>{friendName}</strong>
        {onBack && (
          <button className="chat-back-button" onClick={onBack}>
            ← Back
          </button>
        )}
      </div>

      <ChatMessageList
        messages={messages}
        selectedFriendId={friendId}
        currentUserId={currentUserId}
      />
      <ChatMessageInput selectedFriendId={friendId} onSend={handleSend} />
    </div>
  );
};

ChatWindow.propTypes = {
  selectedFriend: PropTypes.object,
  onBack: PropTypes.func,
};

export default ChatWindow;
