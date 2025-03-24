import ChatFriendList from "../../components/ChatFriendList";
import ChatWindow from "../../components/ChatWindow";
import "../../styles/Chats.scss";

const Chats = () => {
  return (
    <div className="chats-container">
      <ChatFriendList />
      <ChatWindow />
    </div>
  );
};

export default Chats;
