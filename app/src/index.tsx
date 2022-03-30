import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { HomePage } from "./Containers/Home";

const reqJoke = async () => {
  const in_flight = await fetch("/api/joke/get");
  const output = await in_flight.json();
  return output.joke === undefined ? output.message : output.joke
};

const App = () => {
  const [joke,setJoke] = useState('')
  useEffect(() => {
    reqJoke().then((res) => setJoke(res))
  },[])
 return(
    <HomePage joke={joke}/>
 )
}

// that place from /app/static/index-template.html
const home_node = document.getElementById("home");

// we gotta fetch the joke from the back end instead next!
window.onload = () => {
  ReactDOM.render(<App />, home_node);
};
