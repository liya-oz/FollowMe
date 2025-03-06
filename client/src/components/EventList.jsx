import PropTypes from "prop-types";
import "./EventList.scss";

const EventList = ({ listName, events }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split("T")[0],
    to: "",
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.time);
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;

    return (
      (selectedCategory === "All Category" ||
        event.category === selectedCategory) &&
      (!fromDate || eventDate >= fromDate) &&
      (!toDate || eventDate <= toDate)
    );
  });

  return (
    <div className="event-list-container">
      <div className="event-list-header">
        <h2>{listName}</h2>
        <div className="event-list-filter">
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="event-list-select"
          >
            <option value="All Category">All Category</option>
            {[...new Set(events.map((event) => event.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ),
            )}
          </select>
          <p htmlFor="from">From</p>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => handleDateChange("from", e.target.value)}
            className="event-list-date-input"
          />
          <p htmlFor="to">To</p>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => handleDateChange("to", e.target.value)}
            className="event-list-date-input"
          />
        </div>
      </div>
      <div className="event-list-grid">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="event-list-item"
            onClick={() => {
              window.location.href = `/events/${event._id}`;
            }}
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
                <p className="event-list-item-location">{event.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
