import { useState, useEffect } from "react";
import EventList from "../../components/EventList";
import "../../styles/LandingPage.scss";

const DiscoveryPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();
        params.append("_", Date.now());

        const response = await fetch(`/api/events?${params.toString()}`);
        const data = await response.json();
        console.log("Fetched events data:", data);
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
  }, []);

  return (
    <div className="discovery-page">
      <EventList listName="Discover Events" events={events} />
    </div>
  );
};

export default DiscoveryPage;
