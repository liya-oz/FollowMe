import PropTypes from "prop-types";
import { useState, useCallback, useContext } from "react";
import { Box, Button, TextField, Alert, Typography } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateEvent.scss";

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
      color="success"
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
    <div>
      {" "}
      <h2 className="event-create-page-title">Create Event</h2>
      <Box className="event-create-page">
        <Typography
          variant="h5"
          className="event-create-page__header"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
        >
          Create a New Event
        </Typography>
        {status.error && (
          <Alert severity="error" className="event-create-page__alert">
            {status.error}
          </Alert>
        )}
        {status.success && (
          <Alert
            severity="success"
            onClose={() => setStatus({ success: "" })}
            className="event-create-page__alert"
          >
            {status.success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="event-create-page__form">
          {renderFormFields(
            formFields,
            eventData,
            handleChange,
            requiredFields,
          )}

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
            color="success"
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
            color="success"
          />

          <Box className="event-create-page__buttons">
            <Button
              type="submit"
              fullWidth
              className="event-create-page__submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Event"}
            </Button>

            <Button
              type="button"
              fullWidth
              className="event-create-page__cancel-button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

CreateEventForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateEventForm;
