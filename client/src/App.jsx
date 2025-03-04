import { Routes, Route } from "react-router-dom";

import Header from "./PLAYGROUND/components/Header";
import Popup from "./PLAYGROUND/components/Popup";
import Intro from "./PLAYGROUND/components/Intro";
import Events from "./PLAYGROUND/components/Events";
import CallForEvent from "./PLAYGROUND/components/CallForEvent";
import Footer from "./PLAYGROUND/components/Footer";
import LandingPage from "./PLAYGROUND/pages/LandingPage";
import Login from "./PLAYGROUND/pages/Auth/Login";
import Register from "./PLAYGROUND/pages/Auth/Register";

const App = () => {
  return (
    <>
      <Header />
      <Popup />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Intro />
              <Events />
              <CallForEvent />
              <LandingPage />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
