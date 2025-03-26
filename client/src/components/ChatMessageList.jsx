import PropTypes from "prop-types";

const ChatMessageList = ({ messages, selectedFriendId }) => {
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
  messages: PropTypes.array.isRequired,
  selectedFriendId: PropTypes.string.isRequired,
};

export default ChatMessageList;
