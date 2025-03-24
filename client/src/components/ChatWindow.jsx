import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";

const ChatWindow = () => {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <ChatMessageList />
      <ChatMessageInput />
    </div>
  );
};

export default ChatWindow;

//Events:
//
// private_message (on), typing, stop_typing (on)
