import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import Intro from "../../components/Intro";
import EventList from "../../components/EventList";
import CreateEvent from "../../components/CreateEvent";
import Footer from "../../components/Footer";

const LandingPage = () => {
  return (
    <>
      <div className="auth-links">
        <Link to="/login">Login</Link>
        {" | "}
        <Link to="/register">Register</Link>
      </div>
      <Header />
      <Popup />
      <Intro />
      <EventList />
      <CreateEvent />
      <Footer />
    </>
  );
};

export default LandingPage;
