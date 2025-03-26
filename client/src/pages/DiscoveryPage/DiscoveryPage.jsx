import { useEffect, useState } from "react";
import EventList from "../../components/EventList";
import TopBanner from "../../components/TopBanner";
import DiscoveryEventCreationBox from "../../components/DiscoveryEventCreationBox";
import DiscoveryHeader from "../../components/discovery-header";
import ExploreFooter from "../../components/ExploreFooter";
import styles from "../../styles/DiscoveryPage.module.scss";
import useFilteredEvents from "../../hooks/useFilteredEvents";

const DiscoveryPage = () => {
  const { events, handleFilterChange, setSearchQuery, setSelectedCity } =
    useFilteredEvents();

  const [cities, setCities] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);

  useEffect(() => {
    const uniqueCities = [...new Set(events.map((event) => event.location))];
    setCities(uniqueCities);
  }, [events]);

  return (
    <div className={`${styles.discoveryPage} ${styles.extraSpacing}`}>
      <DiscoveryHeader
        setSearchQuery={setSearchQuery}
        cities={cities}
        setSelectedCity={setSelectedCity}
      />
      <TopBanner />
      <EventList
        listName="Discover Events"
        events={events}
        onFilterChange={handleFilterChange}
        showAllEvents={showAllEvents}
      />
      <ExploreFooter
        showAllEvents={showAllEvents}
        setShowAllEvents={setShowAllEvents}
        hideCreateButton={true}
      />
      <DiscoveryEventCreationBox />
    </div>
  );
};

export default DiscoveryPage;
