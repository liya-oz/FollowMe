import PropTypes from "prop-types";

const ChatMessageList = ({ messages, currentUserId, friendName }) => {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
      {messages.map((msg, index) => {
        const isOwn = msg.from === currentUserId;
        return (
          <div
            key={index}
            style={{
              marginBottom: "8px",
              textAlign: isOwn ? "right" : "left",
            }}
          >
            <strong>{isOwn ? "You" : friendName}:</strong> {msg.content}
          </div>
        );
      })}
    </div>
  );
};

ChatMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUserId: PropTypes.string.isRequired,
  friendName: PropTypes.string.isRequired,
};

export default ChatMessageList;
