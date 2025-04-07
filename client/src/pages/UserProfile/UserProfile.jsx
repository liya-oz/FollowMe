import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  Avatar,
} from "@mui/material";
import {
  FaPenToSquare,
  FaArrowLeft,
  FaUserPlus,
  FaTrash,
} from "react-icons/fa6";

import { FaCommentAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import EventHistory from "../../components/EventHistory";
import "../../styles/UserProfile.scss";
import PropTypes from "prop-types";

const UserProfile = ({ editable = false }) => {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    interests: "",
    age: "",
    location: "",
    about: "",
    profilePhoto: "",
  });
  const [message, setMessage] = useState("");
  const [editModes, setEditModes] = useState({});
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [addFriendResult, setAddFriendResult] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [isRemovingFriend, setIsRemovingFriend] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const endpoint = editable ? "/api/users/me" : `/api/users/${id}`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setFormData({
            _id: data.data._id,
            name: data.data.name || "",
            interests: data.data.interests || "",
            age: data.data.age || "",
            location: data.data.location || "",
            about: data.data.about || data.data.bio || "",
            profilePhoto: data.data.profilePhoto || "",
            isPublic:
              typeof data.data.isPublic === "boolean"
                ? data.data.isPublic
                : true,
          });
          if (editable) {
            setEditModes({
              name: !data.data.name,
              interests: !data.data.interests,
              age: !data.data.age,
              location: !data.data.location,
              about: !(data.data.about || data.data.bio),
              profilePhoto: !data.data.profilePhoto,
            });
          }
          if (!editable && id) {
            await checkFriendshipStatus(id);
          }
        } else {
          console.error("Failed to fetch user:", data.message);
        }
      } catch {
        console.error("Error fetching user profile.");
      }
    };
    fetchUserProfile();
  }, [id, editable]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleEditMode = (field) => {
    if (editable) {
      setEditModes((prev) => ({ ...prev, [field]: !prev[field] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editable) {
      const result = await updateProfile(formData);
      setMessage(result.message);
      if (result.success) {
        setEditModes({
          name: false,
          interests: false,
          age: false,
          location: false,
          about: false,
          profilePhoto: false,
        });
      }
    }
  };

  const handleAddFriend = async () => {
    if (!id) return;

    setIsAddingFriend(true);
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ friendId: id }),
      });

      const data = await response.json();
      if (data.success) {
        setIsFriend(true);
        setAddFriendResult({
          success: true,
          message: "Friend added successfully!",
        });
      } else {
        setAddFriendResult({
          success: false,
          message: data.message || "Failed to add friend",
        });
      }

      setTimeout(() => {
        setAddFriendResult(null);
      }, 3000);
    } catch {
      setAddFriendResult({
        success: false,
        message: "Error adding friend. Please try again.",
      });
    } finally {
      setIsAddingFriend(false);
    }
  };

  const checkFriendshipStatus = async (userId) => {
    try {
      const response = await fetch("/api/friends", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        const isFriendInList = data.result.some(
          (friend) => friend.friendId._id === userId,
        );

        setIsFriend(isFriendInList);
      } else {
        setIsFriend(false);
      }
    } catch {
      console.error("Error checking friendship status.");
      setIsFriend(false);
    }
  };
  const handleRemoveFriend = async () => {
    if (!id) return;

    setIsRemovingFriend(true);
    try {
      const response = await fetch(`/api/friends/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setIsFriend(false);
        setAddFriendResult({
          success: true,
          message: "Friend removed successfully",
        });
      } else {
        setAddFriendResult({
          success: false,
          message: data.message || "Failed to remove friend",
        });
      }

      setTimeout(() => {
        setAddFriendResult(null);
      }, 3000);
    } catch {
      setAddFriendResult({
        success: false,
        message: "Error removing friend",
      });
    } finally {
      setIsRemovingFriend(false);
    }
  };

  const handleOpenChat = () => {
    navigate(`/chats?friendId=${id}`);
  };

  const formFields = ["interests", "age", "location", "about", "profilePhoto"];

  return (
    <Container className="user-profile-container">
      <Box className="back-button" onClick={() => navigate(-1)}>
        <IconButton aria-label="go back">
          <FaArrowLeft size={20} />
        </IconButton>
        <Typography variant="button" className="back-text">
          Go Back
        </Typography>
      </Box>

      <Paper className="user-profile-card">
        <div className="profile-header">
          <div className="avatar-name-container">
            <Avatar
              src={formData.profilePhoto}
              alt="Profile Photo"
              className="user-profile-avatar"
            />
            <Box className="name-with-actions">
              <Typography
                className="user-profile-title"
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold" }}
              >
                {formData.name || "Name"}
              </Typography>

              {!editable && (
                <Box className="profile-action-buttons">
                  <IconButton
                    className="chat-btn"
                    onClick={handleOpenChat}
                    aria-label="Chat with user"
                  >
                    <FaCommentAlt />
                  </IconButton>

                  {isFriend ? (
                    <IconButton
                      className="friend-status-btn"
                      onClick={handleRemoveFriend}
                      disabled={isRemovingFriend}
                      aria-label="Remove friend"
                    >
                      <FaTrash style={{ color: "gray" }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      className="add-friend-btn"
                      onClick={handleAddFriend}
                      disabled={isAddingFriend}
                      aria-label="Add friend"
                    >
                      <FaUserPlus />
                    </IconButton>
                  )}
                </Box>
              )}
            </Box>
            {editable && (
              <IconButton
                onClick={() => toggleEditMode("name")}
                className="edit-icon-button"
              >
                <FaPenToSquare />
              </IconButton>
            )}
          </div>
        </div>

        {message && (
          <Alert className="user-profile-alert" severity="info">
            {message}
          </Alert>
        )}

        {addFriendResult && (
          <Alert
            className="user-profile-alert"
            severity={addFriendResult.success ? "success" : "error"}
          >
            {addFriendResult.message}
          </Alert>
        )}

        <div className="profile-details">
          {editable ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              className="user-profile-form"
            >
              {formFields.map((field) => (
                <Box key={field} className="field-row">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      marginRight: "1rem",
                      minWidth: "80px",
                      textAlign: "left",
                    }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </Typography>
                  {!editModes[field] && formData[field] !== "" ? (
                    <Typography
                      variant="body1"
                      className="display-text"
                      sx={{ overflow: "hidden" }}
                    >
                      {formData[field]}
                    </Typography>
                  ) : (
                    <TextField
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      fullWidth
                      placeholder={
                        field === "profilePhoto"
                          ? "Enter image URL"
                          : `Enter your ${field}`
                      }
                      multiline={field === "about"}
                      variant="standard"
                      className="profile-input"
                    />
                  )}
                  <IconButton
                    onClick={() => toggleEditMode(field)}
                    className="edit-icon-button"
                  >
                    <FaPenToSquare />
                  </IconButton>
                </Box>
              ))}
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="save-changes-btn"
              >
                Save Changes
              </Button>
            </Box>
          ) : (
            <Box className="user-profile-form">
              {formFields
                .filter((field) => field !== "profilePhoto")
                .map((field) => (
                  <Box
                    key={field}
                    className="field-row"
                    sx={{ alignItems: "center" }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ marginRight: "1rem", minWidth: "80px" }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </Typography>
                    <Typography variant="body1" className="display-text">
                      {formData[field] || "Not provided"}
                    </Typography>
                  </Box>
                ))}
            </Box>
          )}
        </div>
      </Paper>

      {editable && (
        <Box className="event-history-container">
          <EventHistory userId={formData._id} />
        </Box>
      )}
    </Container>
  );
};

UserProfile.propTypes = {
  profileId: PropTypes.string,
  editable: PropTypes.bool,
};

export default UserProfile;
