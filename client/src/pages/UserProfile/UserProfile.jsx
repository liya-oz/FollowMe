import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Alert,
  Avatar,
} from "@mui/material";
import { FaPenToSquare } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import EventHistory from "../../components/EventHistory";
import "../../styles/UserProfile.scss";
import PropTypes from "prop-types";

const UserProfile = ({ profileId, editable = false }) => {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    interests: "",
    profilePhoto: "",
    isPublic: true,
  });
  const [message, setMessage] = useState("");
  const [editModes, setEditModes] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const endpoint = editable ? "/api/users/me" : `/api/users/${profileId}`;
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
            bio: data.data.bio || "",
            interests: data.data.interests || "",
            profilePhoto: data.data.profilePhoto || "",
            isPublic:
              typeof data.data.isPublic === "boolean"
                ? data.data.isPublic
                : true,
          });
          if (editable) {
            setEditModes({
              name: !data.data.name,
              bio: !data.data.bio,
              interests: !data.data.interests,
              profilePhoto: !data.data.profilePhoto,
            });
          }
        } else {
          console.error("Failed to fetch user:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [profileId, editable]);

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
          bio: false,
          interests: false,
          profilePhoto: false,
        });
      }
    }
  };

  return (
    <Container className="user-profile-container">
      <Paper className="user-profile-card">
        <div className="user-profile-avatar-container">
          <Avatar
            src={formData.profilePhoto}
            alt="Profile Photo"
            className="user-profile-avatar"
          />
        </div>
        <div className="user-profile-details">
          <Typography
            className="user-profile-title"
            variant="h4"
            component="h1"
          >
            {formData.name || "User Profile"}
          </Typography>

          {message && (
            <Alert className="user-profile-alert" severity="info">
              {message}
            </Alert>
          )}

          {editable ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              className="user-profile-form"
            >
              {["name", "bio", "interests", "profilePhoto"].map((field) => (
                <Box key={field} className="field-row">
                  {!editModes[field] && formData[field] !== "" ? (
                    <Typography variant="body1" className="display-text">
                      {formData[field]}
                    </Typography>
                  ) : (
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      fullWidth
                      placeholder={
                        field === "profilePhoto"
                          ? "Enter image URL"
                          : `Enter your ${field}`
                      }
                      multiline={field === "bio"}
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
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                  />
                }
                label="Public Profile"
                className="public-profile-label"
              />
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
              {["name", "bio", "interests"].map((field) => (
                <Box key={field} className="field-row">
                  <Typography variant="body1" className="display-text">
                    {formData[field] || "Not provided"}
                  </Typography>
                </Box>
              ))}
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPublic"
                    checked={formData.isPublic}
                    disabled
                  />
                }
                label="Public Profile"
                className="public-profile-label"
              />
            </Box>
          )}
        </div>
      </Paper>

      {editable && (
        <Box className="event-history-container">
          <Typography
            className="event-history-title"
            variant="h5"
            component="h2"
          >
            Event History
          </Typography>
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
