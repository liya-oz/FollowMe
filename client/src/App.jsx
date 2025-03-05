import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
