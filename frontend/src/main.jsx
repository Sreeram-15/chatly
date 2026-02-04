<<<<<<< HEAD
// src/main.jsx — very first line
if (typeof process === 'undefined') window.process = { env: { NODE_ENV: 'production' } };
=======
>>>>>>> 1cf7ab5398a0ccf456622c8aefa5d87d35476e7b
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
