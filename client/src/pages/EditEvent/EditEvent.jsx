import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    time: "",
    maxParticipants: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setEventData(response.data.data);
    } catch (err) {
      console.error("Fetch Event Error:", err);
      setError("Failed to fetch event details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.put(`/api/events/${eventId}`, eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSuccess("Event updated successfully!");
      setTimeout(() => navigate("/my-events"), 2000);
    } catch (err) {
      console.error("Update Event Error:", err);
      setError("Failed to update event. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setSuccess("Event deleted successfully!");
        setTimeout(() => navigate("/my-events"), 2000);
      } catch (err) {
        console.error("Delete Event Error:", err);
        setError("Failed to delete event. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress sx={{ color: "var(--primary-green)" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "var(--padding-medium)" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "var(--black)" }}>
        Edit Event
      </Typography>
      {error && (
        <Alert sx={{ background: "var(--primary-red)", color: "var(--white)" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          sx={{ background: "var(--secondary-green)", color: "var(--white)" }}
        >
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            background: "var(--darker-white)",
            borderRadius: "var(--border-radius-small)",
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
          sx={{
            background: "var(--darker-white)",
            borderRadius: "var(--border-radius-small)",
          }}
        />
        <TextField
          label="Category"
          name="category"
          value={eventData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            background: "var(--darker-white)",
            borderRadius: "var(--border-radius-small)",
          }}
        />
        <TextField
          label="Location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            background: "var(--darker-white)",
            borderRadius: "var(--border-radius-small)",
          }}
        />
        <TextField
          label="Event Time"
          name="time"
          type="datetime-local"
          value={eventData.time}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
          sx={{
            background: "var(--darker-white)",
            borderRadius: "var(--border-radius-small)",
          }}
        />
        <TextField
          label="Max Participants"
          name="maxParticipants"
          type="number"
          value={eventData.maxParticipants}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            background: "var(--darker-white)",
            borderRadius: "var(--border-radius-small)",
          }}
        />
        <TextField
          label="Image URL"
          name="image"
          value={eventData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            background: "var(--darker-white)",
            borderRadius: "var(--border-radius-small)",
          }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "var(--padding-small)",
            mt: "var(--padding-medium)",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "var(--primary-green)",
              color: "var(--white)",
              "&:hover": { background: "var(--secondary-green)" },
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            sx={{
              background: "var(--primary-red)",
              color: "var(--white)",
              "&:hover": { background: "var(--dark-red)" },
            }}
          >
            Delete Event
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditEvent;
