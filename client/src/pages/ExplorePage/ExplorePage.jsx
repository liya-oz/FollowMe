import { useEffect, useState } from "react";
import DiscoveryHeader from "../../components/discovery-header";
import EventList from "../../components/EventList";
import ExploreFooter from "../../components/ExploreFooter";
import useFilteredEvents from "../../hooks/useFilteredEvents";

const ExplorePage = () => {
  const { events, handleFilterChange, setSearchQuery, setSelectedCity } =
    useFilteredEvents();

  const [cities, setCities] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    const uniqueCities = [...new Set(events.map((event) => event.location))];
    setCities(uniqueCities);
  }, [events]);

  return (
    <div className="explore-page">
      <DiscoveryHeader
        setSearchQuery={setSearchQuery}
        cities={cities}
        setSelectedCity={setSelectedCity}
      />

      <EventList
        listName="Upcoming Events"
        events={events}
        showAllEvents={showAllEvents}
        onFilterChange={handleFilterChange}
      />

      <ExploreFooter
        showAllEvents={showAllEvents}
        setShowAllEvents={setShowAllEvents}
      />
    </div>
  );
};

export default ExplorePage;
