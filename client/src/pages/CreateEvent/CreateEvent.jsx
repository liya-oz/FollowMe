import PropTypes from "prop-types";
import { useState, useCallback, useContext } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
const requiredFields = ["title", "description", "category", "location"];

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const renderFormFields = (fields, eventData, handleChange, requiredFields) =>
  fields.map((field) => (
    <TextField
      key={field}
      label={capitalizeFirstLetter(field)}
      name={field}
      value={eventData[field]}
      onChange={handleChange}
      required={requiredFields.includes(field)}
      margin="normal"
      fullWidth
      className="event-create-page__input"
      sx={{
        backgroundColor: "var(--white)",
        borderRadius: "var(--border-radius-small)",
      }}
    />
  ));

const CreateEventForm = ({ onClose }) => {
  const { authToken } = useContext(AuthContext);
  const [eventData, setEventData] = useState(defaultEventData);
  const [status, setStatus] = useState({ error: "", success: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus({ error: "", success: "" });
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
          setStatus({ success: "Event created successfully!" });
          setEventData(defaultEventData);
          setTimeout(() => {
            setStatus({ success: "" });
            onClose();
            navigate("/my-events");
          }, 2000);
        } else {
          setStatus({
            error:
              data.message || "Event creation failed. Please check your data.",
          });
        }
      } catch (err) {
        console.error(err);
        setStatus({ error: "Failed to create event. Try again later." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [eventData, authToken, navigate, onClose],
  );

  return (
    <Box
      className="event-create-page"
      sx={{
        backgroundColor: "var(--darker-white)",
        padding: "var(--padding-medium)",
        borderRadius: "var(--border-radius-medium)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        className="event-create-page__title"
        sx={{ color: "var(--black)" }}
      >
        Create New Event
      </Typography>

      {status.error && (
        <Alert
          severity="error"
          className="event-create-page__alert"
          sx={{
            backgroundColor: "var(--secondary-red)",
            color: "var(--white)",
          }}
        >
          {status.error}
        </Alert>
      )}
      {status.success && (
        <Alert
          severity="success"
          onClose={() => setStatus({ success: "" })}
          className="event-create-page__alert"
          sx={{
            backgroundColor: "var(--secondary-green)",
            color: "var(--white)",
          }}
        >
          {status.success}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="event-create-page__form">
        {renderFormFields(formFields, eventData, handleChange, requiredFields)}

        <TextField
          label="Event Time"
          name="time"
          type="datetime-local"
          value={eventData.time}
          onChange={handleChange}
          required
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          className="event-create-page__input"
          sx={{
            backgroundColor: "var(--white)",
            borderRadius: "var(--border-radius-small)",
          }}
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
          className="event-create-page__input"
          sx={{
            backgroundColor: "var(--white)",
            borderRadius: "var(--border-radius-small)",
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: "var(--padding-small)",
            mt: "var(--padding-medium)",
          }}
          className="event-create-page__buttons"
        >
          <Button
            type="submit"
            fullWidth
            className="event-create-page__submit-button"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "var(--primary-green)",
              color: "var(--white)",
              "&:hover": { backgroundColor: "var(--dark-black)" },
            }}
          >
            {isSubmitting ? "Submitting..." : "Create Event"}
          </Button>

          <Button
            type="button"
            fullWidth
            className="event-create-page__cancel-button"
            onClick={onClose}
            sx={{
              backgroundColor: "var(--primary-red)",
              color: "var(--white)",
              "&:hover": { backgroundColor: "var(--dark-red)" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

CreateEventForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateEventForm;
