//dependencies
import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
//components
import App from "./App";

//stylings
import "./index.css";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
