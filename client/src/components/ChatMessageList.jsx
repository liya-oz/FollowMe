import PropTypes from "prop-types";
import "../styles/ChatMessageList.scss";

const ChatMessageList = ({ messages, currentUserId, friendName }) => {
  return (
    <div className="chat-message-list">
      {messages.map((msg, index) => {
        const isOwn = msg.from === currentUserId;

        return (
          <div
            key={index}
            className={`message-row ${isOwn ? "own" : "friend"}`}
          >
            <div className={`message-bubble ${isOwn ? "own" : "friend"}`}>
              <div className="message-sender">{isOwn ? "You" : friendName}</div>
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
