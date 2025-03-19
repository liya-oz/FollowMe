import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Intro from "../../components/Intro";
import EventList from "../../components/EventList";
import EventCreationBox from "../../components/EventCreationBox";
import Footer from "../../components/Footer";
import "../../styles/LandingPage.scss";

const LandingPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();
        // If query is at least 2 characters, add it.
        if (searchQuery && searchQuery.trim().length > 1) {
          params.append("keyword", searchQuery.trim());
        }
        if (selectedCity) {
          params.append("location", selectedCity);
        }
        if (selectedCategory && selectedCategory !== "All Category") {
          params.append("category", selectedCategory);
        }
        // Cache buster so each request is unique
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
  }, [searchQuery, selectedCity, selectedCategory]);

  const uniqueCities = Array.from(
    new Set(events.map((event) => event.location)),
  );

  return (
    <>
      <Header
        setSearchQuery={setSearchQuery}
        cities={uniqueCities}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedCity={setSelectedCity}
      />
      <Intro />
      <div className="upcoming-events">
        <EventList
          listName="Upcoming Events"
          events={events}
          searchQuery={searchQuery}
          selectedCity={selectedCity}
        />
      </div>
      <EventCreationBox />
      <Footer />
    </>
  );
};

export default LandingPage;
