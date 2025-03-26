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
              display: "flex",
              justifyContent: isOwn ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: isOwn ? "#DCF8C6" : "#E6E6E6",
                textAlign: "left",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {isOwn ? "You" : friendName}
              </div>
              <div>{msg.content}</div>
            </div>
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
