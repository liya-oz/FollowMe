import { useState } from "react";
import CreateEventModal from "./CreateEventModal.jsx";
import "../styles/EventCreationBox.scss";

const DiscoveryEventCreationBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <div className="event-container">
      <div className="event-box">
        <h4 className="event-title">Not just attending - start creating!</h4>
        <p className="event-description">
          With <span className="highlight">FollowMe</span>, you can host events
          that match your interests, bring like-minded people together, and
          build new connections. Whether it’s a casual meetup, a themed
          gathering, or something unique, your event could be the next big
          thing!
        </p>
        <button className="event-button" onClick={toggleModal}>
          Create Your Event
        </button>
      </div>
      {isModalOpen && (
        <CreateEventModal open={isModalOpen} onClose={toggleModal} />
      )}
    </div>
  );
};

export default DiscoveryEventCreationBox;
