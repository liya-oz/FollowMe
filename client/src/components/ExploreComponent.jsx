import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/ExploreComponent.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import arrowDownIcon from "../assets/icons/arrow-down.svg";
import ExploreFooter from "./ExploreFooter";

const ExploreComponent = ({ listName, events, setFilters }) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categories, setCategories] = useState(["All Categories"]);
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    const uniqueCategories = [
      "All Categories",
      ...new Set(events.map((event) => event.category)),
    ];
    setCategories(uniqueCategories);
  }, [events]);

  const handleDateChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
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
            <img
              src={arrowDownIcon}
              alt="Dropdown"
              className="arrow-icon"
              onClick={() => document.getElementById("from-date").showPicker()}
            />
            <input
              type="date"
              id="from-date"
              className="hidden-date-input"
              onChange={(e) => handleDateChange("from", e.target.value)}
            />

            <span>To</span>
            <img
              src={arrowDownIcon}
              alt="Dropdown"
              className="arrow-icon"
              onClick={() => document.getElementById("to-date").showPicker()}
            />
            <input
              type="date"
              id="to-date"
              className="hidden-date-input"
              onChange={(e) => handleDateChange("to", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="event-grid">
        {(showAllEvents ? events : events.slice(0, 4)).map((event) => (
          <div key={event._id} className="event-item">
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
    </div>
  );
};

ExploreComponent.propTypes = {
  listName: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default ExploreComponent;
