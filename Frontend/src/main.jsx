import "./index.css"; // ✅ This line is mandatory
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅ use correct path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Wrap your whole app here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
