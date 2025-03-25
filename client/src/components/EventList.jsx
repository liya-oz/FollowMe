import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "../styles/EventList.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AuthContext } from "../contexts/AuthContext";
import EventDetailsModal from "./EventDetailsModal";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import arrowDownIcon from "../assets/icons/arrow-down.svg";

const EventList = ({ listName, events }) => {
  const { authToken } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    category: "All Categories",
  });

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalType, setModalType] = useState("");

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState(["All Categories"]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const unique = [
      "All Categories",
      ...new Set(events.map((event) => event.category)),
    ];
    setCategories(unique);
  }, [events]);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setModalType(authToken ? "details" : "login");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setModalType("");
  };

  const handleDateChange = (field, date) => {
    const formatted = date ? format(date, "yyyy-MM-dd") : "";
    setFilters((prev) => ({ ...prev, [field]: formatted }));

    if (field === "from") setFromDate(date);
    if (field === "to") setToDate(date);
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setShowCategoryDropdown(false);
  };

  const from = filters.from ? new Date(filters.from) : null;
  const to = filters.to ? new Date(filters.to) : null;
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.time);
    const matchDate = (!from || eventDate >= from) && (!to || eventDate <= to);
    const matchCat =
      filters.category === "All Categories" ||
      event.category === filters.category;
    return matchDate && matchCat;
  });

  return (
    <div className="event-list-container">
      <div className="event-list-header">
        <h2>{listName}</h2>
        <div className="filters">
          <div className="filter-dropdown">
            <div
              className="filter-box category-filter"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span className="bold-text">{filters.category}</span>
              <img src={arrowDownIcon} alt="Dropdown" className="arrow-icon" />
            </div>

            {showCategoryDropdown && (
              <div className="dropdown-contents">
                {categories.map((cat, idx) => (
                  <p key={idx} onClick={() => handleCategoryChange(cat)}>
                    {cat}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="filter-box">
            <span className="bold-text">By date</span>
            <span>From</span>
            <ReactDatePicker
              selected={fromDate}
              onChange={(date) => handleDateChange("from", date)}
              dateFormat="yyyy-MM-dd"
              className="date-picker"
              placeholderText="Select date"
            />
            <span>To</span>
            <ReactDatePicker
              selected={toDate}
              onChange={(date) => handleDateChange("to", date)}
              dateFormat="yyyy-MM-dd"
              className="date-picker"
              placeholderText="Select date"
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

      <Modal open={open} onClose={handleClose}>
        <>
          {modalType === "login" ? (
            <Box className="event-modal">
              <h2>Sign Up to Join Events</h2>
              <p>
                You need to login or register to view details for &quot;
                {selectedEvent?.title}&quot;.
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
          ) : (
            selectedEvent && (
              <EventDetailsModal event={selectedEvent} onClose={handleClose} />
            )
          )}
        </>
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
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default EventList;
