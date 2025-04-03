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
  const [visibleCount, setVisibleCount] = useState(8);

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
        visibleCount={visibleCount}
        onFilterChange={handleFilterChange}
      />
      <ExploreFooter
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        totalEvents={events.length}
        hideCreateButton={true}
      />
      <DiscoveryEventCreationBox />
    </div>
  );
};

export default DiscoveryPage;
