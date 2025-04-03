import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FaCommentAlt, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import "../../styles/MyFriends.scss";
import PropTypes from "prop-types";
import defaultUserIcon from "../../assets/icons/user-icon.png";

const FriendCard = ({ friend, onMessage, onDelete, onProfileClick }) => {
  return (
    <Box className="friend-card">
      <div className="friend-info-container" onClick={onProfileClick}>
        <img
          src={friend.friendId?.profilePhoto || defaultUserIcon}
          alt={friend.friendId?.name}
          className="friend-photo"
        />
        <Box className="friend-info">
          <Typography className="friend-name">
            {friend.friendId?.name}
          </Typography>
        </Box>
      </div>
      <Box className="friend-actions">
        <IconButton onClick={() => onMessage(friend)}>
          <FaCommentAlt style={{ color: "green" }} />
        </IconButton>
        <IconButton onClick={() => onDelete(friend)}>
          <FaTrash style={{ color: "red" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

FriendCard.propTypes = {
  friend: PropTypes.shape({
    friendId: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profilePhoto: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onMessage: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
};

const MyFriends = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [filterOption, setFilterOption] = useState("lastAdded");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const handleProfileView = (friend) => {
    navigate(`/user/${friend.friendId._id}`);
  };

  const fetchFriends = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/friends", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: {
          sort: sortOption,
          filter: filterOption,
        },
      });
      if (response.data.success) {
        setFriends(response.data.result);
      } else {
        setError("Unable to fetch friends.");
      }
    } catch (err) {
      console.error("Error fetching friends:", err);
      setError("Error fetching friends.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, [sortOption, filterOption]);

  const handleDelete = async (friend) => {
    try {
      const response = await axios.delete(
        `/api/friends/${friend.friendId._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      if (response.data.success) {
        setFriends((prevFriends) =>
          prevFriends.filter((f) => f.friendId._id !== friend.friendId._id),
        );
      }
    } catch (err) {
      console.error("Error deleting friend:", err);
      setError("Error deleting friend.");
    }
  };

  const handleMessage = (friend) => {
    navigate(`/chats?friendId=${friend.friendId._id}`);
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <Container className="friends-list-container">
      <Box className="friends-list-header">
        <Typography variant="h5" className="friends-list-title">
          Friends
        </Typography>
        <Box className="sorting-filters">
          <FormControl variant="standard" className="sort-select">
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <MenuItem value="name">by name</MenuItem>
              <MenuItem value="dateAdded">by date added</MenuItem>
              <MenuItem value="activity">by activity</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" className="filter-select">
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <MenuItem value="lastAdded">last added</MenuItem>
              <MenuItem value="firstAdded">first added</MenuItem>
              <MenuItem value="recentlyActive">recently active</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box className="friends-list-cards">
          {friends.slice(0, visibleCount).map((friend) => (
            <FriendCard
              key={friend.friendId._id}
              friend={friend}
              onMessage={handleMessage}
              onDelete={handleDelete}
              onProfileClick={() => handleProfileView(friend)}
            />
          ))}
        </Box>
      )}

      {friends.length > visibleCount && (
        <Box className="view-more-container">
          <Button
            variant="contained"
            onClick={handleViewMore}
            className="view-more-button"
            startIcon={<FaEye />}
          >
            View More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MyFriends;
