import { useState } from "react";
import ChatFriendList from "../../components/ChatFriendList";
import ChatWindow from "../../components/ChatWindow";
import "../../styles/Chats.scss";

const Chats = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="chats-container">
      <ChatFriendList onSelectFriend={setSelectedFriend} />
      <ChatWindow selectedFriend={selectedFriend} />
    </div>
  );
};

export default Chats;
