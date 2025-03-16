import PropTypes from "prop-types";
import { useState, useCallback, useContext } from "react";
import {
  Modal,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/CreateEventModal.scss";
import { AuthContext } from "../contexts/AuthContext";

const defaultEventData = {
  title: "",
  description: "",
  category: "",
  location: "",
  time: "",
  maxParticipants: "",
  image: "",
};

const formFields = ["title", "description", "category", "location", "image"];

const CreateEventModal = ({ open, onClose }) => {
  const { authToken } = useContext(AuthContext);
  const [eventData, setEventData] = useState(defaultEventData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setIsSubmitting(true);

      try {
        const token = authToken || localStorage.getItem("authToken");

        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(eventData),
        });
        const data = await response.json();

        if (data.success) {
          setSuccess("Event created successfully!");
          setEventData(defaultEventData);
          setTimeout(() => {
            setSuccess("");
            onClose();
          }, 2000);
        } else {
          setError(
            data.message || "Event creation failed. Please check your data.",
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to create event. Try again later.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [eventData, onClose, authToken],
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="create-event-modal">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h2">
            Create New Event
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <TextField
              key={field}
              label={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              name={field}
              value={eventData[field]}
              onChange={handleChange}
              required={[
                "title",
                "description",
                "category",
                "location",
              ].includes(field)}
              margin="normal"
              fullWidth
            />
          ))}

          <TextField
            label="Time"
            name="time"
            type="datetime-local"
            value={eventData.time}
            onChange={handleChange}
            required
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Max Participants"
            name="maxParticipants"
            type="number"
            value={eventData.maxParticipants}
            onChange={handleChange}
            required
            margin="normal"
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              type="submit"
              fullWidth
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Event"}
            </Button>
            <Button
              type="button"
              fullWidth
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

CreateEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateEventModal;
