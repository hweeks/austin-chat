import React, { useState } from "react";
import { BeautifulText, SexyContainer } from "./styles";
import Header from "../Header";
import JokeForm from "../JokeForm";

const reqJoke = async () => {
  const in_flight = await fetch("/api/joke/get");
  const output = await in_flight.json();
  return output.joke === undefined ? output.message : output.joke
};

export const HomePage = ({ joke }: { joke: string }) => {
  const is_joke_funny = joke === "penis";
  const [joke_remote, set_joke] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)

  if (joke_remote === "") reqJoke().then((res) => set_joke(res));
  return (
    <SexyContainer>
      <Header/>
      {loggedIn && <JokeForm/>}
      {!is_joke_funny && <BeautifulText>{joke_remote}</BeautifulText>}
      {is_joke_funny && <BeautifulText>grow up</BeautifulText>}
    </SexyContainer>
  );
};
