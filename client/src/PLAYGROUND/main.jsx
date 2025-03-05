import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import AppWrapper from "./AppWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <AppWrapper>
    <App />
  </AppWrapper>,
);
