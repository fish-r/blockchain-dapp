import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Profile } from "./mantineComponents/Profile";
// We import bootstrap here, but you can remove if you want
// import "bootstrap/dist/css/bootstrap.css";

import './index.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from "@mantine/core";
import Home from "./pages/Home";

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/* Define other routes as needed */}
        </Routes>
      </Router>
    </MantineProvider>
  </React.StrictMode>
);