import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import Intro from "../../components/Intro";
import EventList from "../../components/EventList";
import CreateEvent from "../../components/CreateEvent";
import Footer from "../../components/Footer";

const LandingPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
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
  }, []);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Popup />
      <Intro />
      <EventList
        listName="Upcoming Events"
        events={events}
        searchQuery={searchQuery}
      />
      <CreateEvent />
      <Footer />
    </>
  );
};

export default LandingPage;
