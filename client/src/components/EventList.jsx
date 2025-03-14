import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/EventList.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const EventList = ({ listName, events }) => {
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split("T")[0],
    to: "",
  });
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const fromDate = dateRange.from ? new Date(dateRange.from) : null;
  const toDate = dateRange.to ? new Date(dateRange.to) : null;
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.time);
    return (
      (!fromDate || eventDate >= fromDate) && (!toDate || eventDate <= toDate)
    );
  });

  return (
    <div className="event-list-container">
      <div className="event-list-header">
        <h2>{listName}</h2>
        <div className="event-list-date-filters">
          <div className="event-list-filter-wrapper">
            <p>From</p>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => handleDateChange("from", e.target.value)}
              className="event-list-date-input"
            />
          </div>
          <div className="event-list-filter-wrapper">
            <p>To</p>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => handleDateChange("to", e.target.value)}
              className="event-list-date-input"
            />
          </div>
        </div>
      </div>
      <div className="event-list-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="event-list-item"
              onClick={() => handleOpen(event)}
            >
              <div className="event-list-item-wrapper">
                <img src={event.image} alt={event.title} />
                <div className="event-list-item-date">
                  <p>
                    {new Date(event.time).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })}
                  </p>
                </div>
                <div className="event-list-item-content">
                  <h3 className="event-list-item-title">{event.title}</h3>
                  <p className="event-list-item-location">
                    <FaMapMarkerAlt size={14} /> {event.location}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No events found matching the filters.</p>
        )}
      </div>
      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box className="event-modal">
          <h2>Sign Up to Join Events</h2>
          <p>
            You need to login or register to apply for &quot;
            {selectedEvent?.title}
            &quot; event.
          </p>
          <div>
            <Button
              className="event-modal-button"
              variant="contained"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>
            <Button
              className="event-modal-button"
              variant="contained"
              onClick={() => (window.location.href = "/register")}
            >
              Register
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

EventList.propTypes = {
  listName: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default EventList;
