import { useEffect, useState } from "react";

const useFilteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    category: "All Categories",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [hasUserFiltered, setHasUserFiltered] = useState(false);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await fetch("/api/events/all");
        const data = await response.json();
        if (data.success) {
          setEvents(data.result);
        }
      } catch (error) {
        console.error("Error fetching all events:", error);
      }
    };

    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    if (!hasUserFiltered) return;

    const noFiltersApplied =
      !filters.from &&
      !filters.to &&
      filters.category === "All Categories" &&
      !searchQuery &&
      !selectedCity;

    if (noFiltersApplied) {
      const fetchAllEvents = async () => {
        try {
          const response = await fetch("/api/events/all");
          const data = await response.json();
          if (data.success) {
            setEvents(data.result);
          }
        } catch (error) {
          console.error("Error fetching all events:", error);
        }
      };

      fetchAllEvents();
      return;
    }

    const fetchFilteredEvents = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.from) params.append("from", filters.from);
        if (filters.to) params.append("to", filters.to);
        if (filters.category && filters.category !== "All Categories")
          params.append("category", filters.category);
        if (searchQuery) params.append("keyword", searchQuery);
        if (selectedCity) params.append("location", selectedCity);

        const response = await fetch(`/api/events?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setEvents(data.result);
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching filtered events:", error);
      }
    };

    fetchFilteredEvents();
  }, [filters, searchQuery, selectedCity, hasUserFiltered]);

  return {
    events,
    filters,
    setSearchQuery: (q) => {
      setHasUserFiltered(true);
      setSearchQuery(q);
    },
    setSelectedCity: (c) => {
      setHasUserFiltered(true);
      setSelectedCity(c);
    },
    handleFilterChange: (newFilters) => {
      setHasUserFiltered(true);
      setFilters(newFilters);
    },
  };
};

export default useFilteredEvents;
