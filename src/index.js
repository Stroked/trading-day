import React from "react";
import ReactDOM from "react-dom";
//index.css contains normalized modern css rules
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router>
    <App />

  </Router>,
  document.getElementById("root")
);
  // <ScrollToTop />;
