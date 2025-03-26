import Header from "../../components/Header";
import Intro from "../../components/Intro";
import EventList from "../../components/EventList";
import EventCreationBox from "../../components/EventCreationBox";
import Footer from "../../components/Footer";
import useFilteredEvents from "../../hooks/useFilteredEvents";
import "../../styles/LandingPage.scss";

const LandingPage = () => {
  const {
    events,
    filters,
    setSearchQuery,
    setSelectedCity,
    handleFilterChange,
  } = useFilteredEvents();

  const uniqueCities = Array.from(
    new Set(events.map((event) => event.location)),
  );

  return (
    <>
      <Header
        setSearchQuery={setSearchQuery}
        cities={uniqueCities}
        selectedCategory={filters.category}
        setSelectedCategory={(cat) =>
          handleFilterChange({ ...filters, category: cat })
        }
        setSelectedCity={setSelectedCity}
      />
      <Intro />
      <div className="upcoming-events">
        <EventList
          listName="Upcoming Events"
          events={events}
          showAllEvents={true}
          onFilterChange={handleFilterChange}
        />
      </div>
      <EventCreationBox />
      <Footer />
    </>
  );
};

export default LandingPage;
