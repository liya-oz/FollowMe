import { useState, useEffect } from "react";
import ChatFriendList from "../../components/ChatFriendList";
import ChatWindow from "../../components/ChatWindow";
import "../../styles/Chats.scss";

const Chats = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 450;

  return (
    <div className="chats-container">
      {(!isMobile || !selectedFriend) && (
        <ChatFriendList onSelectFriend={setSelectedFriend} />
      )}
      {(!isMobile || selectedFriend) && (
        <ChatWindow
          selectedFriend={selectedFriend}
          onBack={() => setSelectedFriend(null)}
        />
      )}
    </div>
  );
};

export default Chats;
