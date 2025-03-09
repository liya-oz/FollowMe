import "../styles/EventCreationBox.scss";

const EventCreationBox = () => {
  const titleText = "Not just attending - start creating!";
  const descriptionText = (
    <>
      With <span className="highlight">FollowMe</span>, you can host events that
      match your interests, bring like-minded people together, and build new
      connections. Whether it’s a casual meetup, a themed gathering, or
      something unique, your event could be the next big thing!
    </>
  );
  const buttonText = "Create Your Event";

  return (
    <div className="event-container">
      <div className="event-box">
        <h4 className="event-title">{titleText}</h4>
        <p className="event-description">{descriptionText}</p>
        <button className="event-button">{buttonText}</button>
      </div>
    </div>
  );
};

export default EventCreationBox;
