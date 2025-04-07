import { useEffect, useState } from "react";
import "../styles/EventHistory.scss";
import PropTypes from "prop-types";
import EventDetailsModal from "./EventDetailsModal";

const EventHistory = ({ userId }) => {
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchHistory = async () => {
      try {
        const attendedRes = await fetch(`/api/users/user-events/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const attendedData = await attendedRes.json();

        const upcomingRes = await fetch(
          `/api/users/user-upcoming-events/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );
        const upcomingData = await upcomingRes.json();

        if (attendedData.success) {
          setAttendedEvents(attendedData.result);
        }
        if (upcomingData.success) {
          setUpcomingEvents(upcomingData.result);
        }
      } catch (error) {
        console.error("Error fetching event history:", error);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="event-history">
      <h2>Attended Events</h2>
      {attendedEvents.length > 0 ? (
        <ul>
          {attendedEvents.map((event) => (
            <li
              key={event._id}
              onClick={() => handleEventClick(event)}
              className="event-history-item"
            >
              <img
                src={event.image}
                alt={event.title}
                className="event-photo"
              />
              <div className="event-info">
                <span className="event-title">{event.title}</span>
                <span className="event-date">
                  {new Date(event.time).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No attended events found.</p>
      )}

      <h2>Upcoming Events</h2>
      {upcomingEvents.length > 0 ? (
        <ul>
          {upcomingEvents.map((event) => (
            <li
              key={event._id}
              onClick={() => handleEventClick(event)}
              className="event-history-item"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-photo"
                />
              )}
              <div className="event-info">
                <span className="event-title">{event.title}</span>
                <span className="event-date">
                  {new Date(event.time).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming events scheduled.</p>
      )}

      {showModal && selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

EventHistory.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default EventHistory;
