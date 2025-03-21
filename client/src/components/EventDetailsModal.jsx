import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";
import {
  MdCalendarMonth,
  MdAccessTimeFilled,
  MdLocationPin,
} from "react-icons/md";
import "../styles/EventDetailsModal.scss";
import userIcon from "../assets/icons/user-icon.png";

const EventDetailsModal = ({ event, onClose }) => {
  const [isParticipating, setIsParticipating] = useState(false);
  const { authToken } = useContext(AuthContext);

  const eventDateTime = event?.time ? new Date(event.time) : null;
  const formattedDate = eventDateTime
    ? eventDateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";
  const formattedTime = eventDateTime
    ? eventDateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Unknown Time";

  const handleParticipate = async () => {
    if (!authToken) {
      alert("You need to log in to participate.");
      return;
    }

    if (!event || !event._id) return;

    setIsParticipating(true);

    try {
      const response = await fetch("/api/event-attendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ eventId: event._id }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to participate");
      }

      alert("Successfully registered for the event! ✅");
    } catch (error) {
      alert(error.message || "Error registering for the event.");
    } finally {
      setIsParticipating(false);
    }
  };

  if (!event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-top">
          <button className="go-back-button" onClick={onClose}>
            &larr; Go Back
          </button>
          <img src={event.image} alt={event.title} className="modal-image" />
          <div className="event-creator">
            <span className="creator-name">
              {event.createdBy?.name || "Unknown"}
            </span>
            <img
              src={event.createdBy?.profileImage || userIcon}
              alt={event.createdBy?.name || "Unknown Creator"}
              className="creator-image"
            />
          </div>
        </div>

        <div className="modal-middle">
          <div className="event-info">
            <h2>{event.title}</h2>
            <p className="event-description">{event.description}</p>
          </div>
          <div className="event-attendees">
            <img src={userIcon} alt="Attendee" className="attendee-image" />
            <img src={userIcon} alt="Attendee" className="attendee-image" />
            <img src={userIcon} alt="Attendee" className="attendee-image" />
            <img src={userIcon} alt="Attendee" className="attendee-image" />
          </div>
        </div>

        <div className="modal-bottom">
          <div className="event-details">
            <div>
              <MdCalendarMonth className="event-icon" />
              <span>{formattedDate}</span>
            </div>
            <div>
              <MdAccessTimeFilled className="event-icon" />
              <span>{formattedTime}</span>
            </div>
            <div>
              <MdLocationPin className="event-icon" />
              <span>{event.location}</span>
            </div>
          </div>
          <button
            className="participate-button"
            onClick={handleParticipate}
            disabled={isParticipating}
          >
            {isParticipating ? "Processing..." : "Participate"}
          </button>
        </div>
      </div>
    </div>
  );
};

EventDetailsModal.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    createdBy: PropTypes.shape({
      name: PropTypes.string,
      profileImage: PropTypes.string,
    }),
    time: PropTypes.string,
    location: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default EventDetailsModal;
