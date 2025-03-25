import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../styles/ChatFriendList.scss";

const ChatFriendList = ({ onSelectFriend }) => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/api/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setFriends(response.data.result);
        } else {
          setError("Failed to load friends.");
        }
      } catch (err) {
        console.error("Error loading friends:", err);
        setError("Error loading friends.");
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="chat-friend-list">
      <h3>My Friends</h3>
      {error && <p className="error">{error}</p>}
      <div className="friends-list-cards">
        {friends.map((friend) => (
          <div
            key={friend.friendId._id}
            className="friend-card"
            onClick={() => onSelectFriend(friend)}
          >
            <div className="friend-info-container">
              <img
                src={friend.friendId.profilePhoto || "/default-profile.png"}
                alt={friend.friendId.name}
                className="friend-photo"
              />
              <div className="friend-info">
                <div className="friend-name">{friend.friendId.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ChatFriendList.propTypes = {
  onSelectFriend: PropTypes.func.isRequired,
};

export default ChatFriendList;
