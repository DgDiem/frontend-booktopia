import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import Providers from "./redux/Provider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./contexts/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Providers>
          <App />
        </Providers>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
