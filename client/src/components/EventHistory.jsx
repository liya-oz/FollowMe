import { useEffect, useState } from "react";
import "../styles/EventHistory.scss";
import PropTypes from "prop-types";

const EventHistory = ({ userId }) => {
  console.log("userId", userId);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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

  return (
    <div className="event-history">
      <h2>Attended Events</h2>
      {attendedEvents.length > 0 ? (
        <ul>
          {attendedEvents.map((event) => (
            <li key={event._id}>
              <img
                src={event.image}
                alt={event.title}
                className="event-photo"
              />
              {event.title} - {new Date(event.time).toLocaleDateString()}
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
            <li key={event._id}>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-photo"
                />
              )}{" "}
              {event.title} - {new Date(event.time).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming events scheduled.</p>
      )}
    </div>
  );
};
EventHistory.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default EventHistory;
