import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus, FaEye } from "react-icons/fa";
import "../styles/ExploreFooter.scss";
import CreateEventModal from "./CreateEventModal";

const ExploreFooter = ({ showAllEvents, setShowAllEvents }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="explore-footer">
      <button
        className="footer-button"
        onClick={() => setShowAllEvents(!showAllEvents)}
      >
        <FaEye className="button-icon" />{" "}
        {showAllEvents ? "Show Less" : "View More"}
      </button>

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
    </div>
  );
};

ExploreFooter.propTypes = {
  showAllEvents: PropTypes.bool.isRequired,
  setShowAllEvents: PropTypes.func.isRequired,
};

export default ExploreFooter;
