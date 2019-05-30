import React from "react";
import ReactDOM from "react-dom";
//index.css contains normalized modern css rules
import "./index.css";
import App from "./App";
import {BrowserRouter} from 'react-router-dom'
ReactDOM.render(
  <BrowserRouter>
    <App />

  </BrowserRouter>,
  document.getElementById("root")
);
  // <ScrollToTop />;
