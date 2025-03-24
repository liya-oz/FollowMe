import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "../../api/eventAttendee";
import { AuthContext } from "../../contexts/AuthContext";
import "../../styles/MyEvents.scss";

const MyEvents = () => {
  const { user, authToken } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    try {
      const myEvents = await getMyEvents();
      setEvents(Array.isArray(myEvents) ? myEvents : []);
    } catch (err) {
      console.error("Fetch My Events Error:", err);
      setError("Failed to fetch events. Please try again later.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEditEvent = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event && event._id !== eventId),
    );

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken || ""}`,
        },
      });

      if (!response.ok) {
        const responseText = await response.text();
        console.error("DELETE response error:", responseText);
        throw new Error(`Failed to delete event: ${responseText}`);
      }

      await fetchEvents();
    } catch (err) {
      console.error("Delete Event Error:", err);
      setError("Failed to delete event. Please try again.");
    }
  };

  const renderEventItem = (event) => {
    const isOwner = user && event.createdBy === user._id;
    const eventDate = new Date(event.time).toLocaleString();

    return (
      <div key={event._id} className="my-events-item">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="my-events-image"
          />
        )}
        <div className="my-events-details">
          <h3>
            {event.title || "Untitled Event"}{" "}
            {isOwner && <span className="creator-label">Created by you</span>}
          </h3>
          <p>
            <strong>Location:</strong> {event.location || "N/A"}
          </p>
          <p>
            <strong>Date:</strong> {eventDate}
          </p>
        </div>

        {isOwner && (
          <div className="my-events-actions">
            <button
              className="my-events-btn my-events-btn-primary"
              onClick={() => handleEditEvent(event._id)}
            >
              Edit
            </button>
            <button
              className="my-events-btn my-events-btn-secondary"
              onClick={() => handleDeleteEvent(event._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="my-events-loader-container">
        <div className="my-events-loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="my-events-alert my-events-error">{error}</div>;
  }

  return (
    <div className="my-events-container">
      <h2>My Events</h2>
      {Array.isArray(events) && events.length > 0 ? (
        events
          .filter((event) => event && event._id && event.title)
          .map(renderEventItem)
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default MyEvents;
