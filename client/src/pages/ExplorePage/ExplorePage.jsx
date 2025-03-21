import { useState, useEffect } from "react";
import DiscoveryHeader from "../../components/discovery-header";
import ExploreComponent from "../../components/ExploreComponent";
import "../../styles/ExploreComponent.scss";

const ExplorePage = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    category: "All Categories",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.from) params.append("from", filters.from);
        if (filters.to) params.append("to", filters.to);
        if (filters.category !== "All Categories")
          params.append("category", filters.category);
        if (searchQuery) params.append("keyword", searchQuery);
        if (selectedCity) params.append("location", selectedCity);

        const response = await fetch(`/api/events?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setEvents(data.result);
          const uniqueCities = [
            ...new Set(data.result.map((event) => event.location)),
          ];
          setCities(uniqueCities);
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [filters, searchQuery, selectedCity]);

  return (
    <div className="explore-page">
      <DiscoveryHeader
        setSearchQuery={setSearchQuery}
        cities={cities}
        setSelectedCity={setSelectedCity}
      />
      <ExploreComponent
        listName="Upcoming Events"
        events={events}
        setFilters={setFilters}
      />
    </div>
  );
};

export default ExplorePage;
