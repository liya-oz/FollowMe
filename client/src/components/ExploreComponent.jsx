import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "../styles/ExploreComponent.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import arrowDownIcon from "../assets/icons/arrow-down.svg";
import ExploreFooter from "./ExploreFooter";
import EventDetailsModal from "./EventDetailsModal";

const ExploreComponent = ({ listName, events, setFilters }) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState(["All Categories"]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const uniqueCategories = [
      "All Categories",
      ...new Set(events.map((event) => event.category)),
    ];
    setCategories(uniqueCategories);
  }, [events]);

  const handleDateChange = (field, date) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    setFilters((prev) => ({ ...prev, [field]: formattedDate }));

    if (field === "from") setFromDate(date);
    if (field === "to") setToDate(date);
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setShowCategoryDropdown(false);
  };

  return (
    <div className="explore-component">
      <div className="explore-header">
        <h2>{listName}</h2>

        <div className="filters">
          <div className="filter-dropdown">
            <div
              className="filter-box category-filter"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span className="bold-text">{categories[0]}</span>
              <img src={arrowDownIcon} alt="Dropdown" className="arrow-icon" />
            </div>

            {showCategoryDropdown && (
              <div className="dropdown-contents">
                {categories.map((category, index) => (
                  <p key={index} onClick={() => handleCategoryChange(category)}>
                    {category}
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

      <div className="event-grid">
        {(showAllEvents ? events : events.slice(0, 4)).map((event) => (
          <div
            key={event._id}
            className="event-item"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="event-wrapper">
              <img src={event.image} alt={event.title} />
              <div className="event-date">
                <p>
                  {new Date(event.time).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })}
                </p>
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p>
                  <FaMapMarkerAlt size={14} /> {event.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ExploreFooter
        showAllEvents={showAllEvents}
        setShowAllEvents={setShowAllEvents}
      />

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

ExploreComponent.propTypes = {
  listName: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default ExploreComponent;
