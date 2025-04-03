import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus, FaEye } from "react-icons/fa";
import "../styles/ExploreFooter.scss";
import CreateEventModal from "./CreateEventModal";

const ExploreFooter = ({
  visibleCount,
  setVisibleCount,
  totalEvents,
  hideCreateButton = false,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleToggle = () => {
    if (visibleCount >= totalEvents) {
      setVisibleCount(8);
    } else {
      setVisibleCount((prev) => prev + 8);
    }
  };

  const isAllVisible = visibleCount >= totalEvents;

  return (
    <div className="explore-footer">
      <button className="footer-button" onClick={handleToggle}>
        <FaEye className="button-icon" />{" "}
        {isAllVisible ? "Show Less" : "View More"}
      </button>

      {!hideCreateButton && (
        <>
          <button
            className="footer-button create-event-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <FaPlus className="button-icon" /> Create Event
          </button>

          <CreateEventModal
            open={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          />
        </>
      )}
    </div>
  );
};

ExploreFooter.propTypes = {
  visibleCount: PropTypes.number.isRequired,
  setVisibleCount: PropTypes.func.isRequired,
  totalEvents: PropTypes.number.isRequired,
  hideCreateButton: PropTypes.bool,
};

export default ExploreFooter;
