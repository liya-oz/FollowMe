import { useState, useEffect } from "react";
import EventList from "../../components/EventList";
import TopBanner from "../../components/TopBanner";
import DiscoveryEventCreationBox from "../../components/DiscoveryEventCreationBox";
import DiscoveryHeader from "../../components/discovery-header";
import styles from "../../styles/DiscoveryPage.module.scss";

const DiscoveryPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery) {
          params.append("keyword", searchQuery);
        }
        if (selectedCity) {
          params.append("location", selectedCity);
        }
        params.append("_", Date.now());

        const response = await fetch(`/api/events?${params.toString()}`);
        const data = await response.json();
        if (data.success) {
          setEvents(data.result);
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [searchQuery, selectedCity]);

  const uniqueCities = Array.from(
    new Set(events.map((event) => event.location)),
  );

  return (
    <div className={`${styles.discoveryPage} ${styles.extraSpacing}`}>
      <DiscoveryHeader
        setSearchQuery={setSearchQuery}
        cities={uniqueCities}
        setSelectedCity={setSelectedCity}
      />
      <TopBanner />
      <EventList listName="Discover Events" events={events} />
      <DiscoveryEventCreationBox />
    </div>
  );
};

export default DiscoveryPage;
