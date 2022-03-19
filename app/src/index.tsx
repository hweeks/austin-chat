import React from "react";
import ReactDOM from "react-dom";
import { HomePage } from "./Containers/Home";

// that place from /app/static/index-template.html
const home_node = document.getElementById("home");

// we gotta fetch the joke from the back end instead next!
window.onload = () => {
  ReactDOM.render(<HomePage joke="knock knock" />, home_node);
};
