import { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
  MdCalendarMonth,
  MdAccessTimeFilled,
  MdLocationPin,
  MdGroups,
  MdPersonAdd,
} from "react-icons/md";
import { Button } from "@mui/material";
import { FaEye } from "react-icons/fa";

import "../styles/EventDetailsModal.scss";
import userIcon from "../assets/icons/user-icon.png";

const EventDetailsModal = ({ event, onClose }) => {
  const [isParticipating, setIsParticipating] = useState(false);
  const [participated, setParticipated] = useState(false);
  const [fullEvent, setFullEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [showAllAttendees, setShowAllAttendees] = useState(false);
  const { authToken, user } = useContext(AuthContext);
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  useEffect(() => {
    const fetchFullEvent = async () => {
      if (!event?._id) return;

      try {
        const res = await fetch(`/api/events/${event._id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const data = await res.json();
        if (res.ok) {
          setFullEvent(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch full event:", err);
      }
    };

    fetchFullEvent();
  }, [event?._id, authToken]);

  useEffect(() => {
    const fetchAttendees = async () => {
      if (!event?._id) return;

      try {
        const res = await fetch(`/api/event-attendees?eventId=${event._id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const data = await res.json();
        if (res.ok && data.result) {
          setAttendees(data.result);

          const alreadyParticipated = data.result.some(
            (att) => att.userId?._id === user?._id,
          );
          setParticipated(alreadyParticipated);
        }
      } catch (err) {
        console.error("Error fetching attendees:", err);
      }
    };

    fetchAttendees();
  }, [event?._id, authToken, user?._id]);

  const currentEvent = fullEvent || event;
  if (!currentEvent) return null;

  const eventDateTime = currentEvent?.time ? new Date(currentEvent.time) : null;
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
      return;
    }

    setIsParticipating(true);

    try {
      const response = await fetch("/api/event-attendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ eventId: currentEvent._id }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to participate");
      }

      setParticipated(true);
      setAttendees((prev) => [...prev, { userId: user }]);
    } catch (error) {
      alert(error.message || "Error registering for the event.");
    } finally {
      setIsParticipating(false);
    }
  };

  const handleViewProfile = (userId) => {
    onClose();
    navigate(`/user/${userId}`);
  };

  const handleAddFriend = async (friendId) => {
    if (!authToken || !friendId) return;

    setIsAddingFriend(true);

    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ friendId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Friend added successfully!");
      } else {
        throw new Error(data.message || "Failed to add friend");
      }
    } catch (error) {
      alert(error.message || "Error adding friend.");
    } finally {
      setIsAddingFriend(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-top">
          <button className="go-back-button" onClick={onClose}>
            &larr; Go Back
          </button>
          <img
            src={currentEvent.image}
            alt={currentEvent.title}
            className="modal-image"
          />
          <div className="event-creator">
            <span className="creator-name">
              by {currentEvent.createdBy?.name || "Unknown"}
            </span>

            <img
              src={currentEvent.createdBy?.profilePhoto || userIcon}
              alt={currentEvent.createdBy?.name || "Unknown Creator"}
              className="creator-image"
            />
          </div>
        </div>

        <div className="modal-middle">
          <div className="event-info">
            <h2>{currentEvent.title}</h2>
            <p className="event-description">{currentEvent.description}</p>
          </div>

          <div className="attendees-wrapper">
            <div className="attendees-label">
              <MdGroups className="attendees-icon" />
              <span>Attendees ({attendees.length})</span>
            </div>
            <div className="event-attendees">
              {(showAllAttendees ? attendees : attendees.slice(0, 4)).map(
                (attendee, index) => (
                  <div key={index} className="attendee-container">
                    <img
                      src={attendee.userId?.profilePhoto || userIcon}
                      alt={attendee.userId?.name || "Attendee"}
                      className="attendee-image"
                      onClick={() => handleViewProfile(attendee.userId?._id)}
                      style={{ cursor: "pointer" }}
                    />
                    {user && attendee.userId?._id !== user._id && (
                      <button
                        className="add-friend-button"
                        onClick={() => handleAddFriend(attendee.userId?._id)}
                        disabled={isAddingFriend}
                      >
                        <MdPersonAdd />
                      </button>
                    )}
                  </div>
                ),
              )}
            </div>

            {attendees.length > 4 && !showAllAttendees && (
              <Button
                variant="text"
                className="view-more-button"
                startIcon={<FaEye />}
                onClick={() => setShowAllAttendees(true)}
              >
                Show more
              </Button>
            )}
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
              <span>{currentEvent.location}</span>
            </div>
          </div>
          <button
            className="participate-button"
            onClick={handleParticipate}
            disabled={isParticipating || participated}
          >
            {participated
              ? "Participated"
              : isParticipating
                ? "Processing..."
                : "Participate"}
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
      profilePhoto: PropTypes.string,
    }),
    time: PropTypes.string,
    location: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default EventDetailsModal;
