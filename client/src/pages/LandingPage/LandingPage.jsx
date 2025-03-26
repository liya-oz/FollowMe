import Header from "../../components/Header";
import Intro from "../../components/Intro";
import EventList from "../../components/EventList";
import EventCreationBox from "../../components/EventCreationBox";
import Footer from "../../components/Footer";
import useFilteredEvents from "../../hooks/useFilteredEvents";
import "../../styles/LandingPage.scss";
import { useEffect, useState } from "react";
import ExploreFooter from "../../components/ExploreFooter";

const LandingPage = () => {
  const { events, handleFilterChange, setSearchQuery, setSelectedCity } =
    useFilteredEvents();
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const uniqueCities = [...new Set(events.map((event) => event.location))];
    setCities(uniqueCities);
  }, [events]);

  return (
    <>
      <Header
        setSearchQuery={setSearchQuery}
        cities={cities}
        setSelectedCity={setSelectedCity}
      />
      <Intro />
      <div className="upcoming-events">
        <EventList
          listName="Upcoming Events"
          events={events}
          showAllEvents={showAllEvents}
          onFilterChange={handleFilterChange}
        />
        <ExploreFooter
          showAllEvents={showAllEvents}
          setShowAllEvents={setShowAllEvents}
          hideCreateButton={true}
        />
      </div>
      <EventCreationBox />
      <Footer />
    </>
  );
};

export default LandingPage;
