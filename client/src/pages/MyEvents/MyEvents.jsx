import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "../../api/eventAttendee";
import "../../styles/MyEvents.scss";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEvents = async () => {
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
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      await fetchEvents();
    } catch (err) {
      console.error("Delete Event Error:", err);
      setError("Failed to delete event. Please try again.");
    }
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
          .map((event) => (
            <div key={event._id} className="my-events-item">
              <h3>{event.title || "Untitled Event"}</h3>
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
            </div>
          ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default MyEvents;
