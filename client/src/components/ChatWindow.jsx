import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import PropTypes from "prop-types";

const ChatWindow = ({ selectedFriend }) => {
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

      <ChatMessageList selectedFriendId={selectedFriend.friendId._id} />
      <ChatMessageInput selectedFriendId={selectedFriend.friendId._id} />
    </div>
  );
};

ChatWindow.propTypes = {
  selectedFriend: PropTypes.object,
};

export default ChatWindow;

//Events:
//
// private_message (on), typing, stop_typing (on)
