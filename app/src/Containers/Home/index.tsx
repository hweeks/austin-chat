import React, { useState } from "react";
import { BeautifulText, SexyContainer } from "./styles";

const req = async () => {
  const in_flight = await fetch("/api/joke/get");
  const output = await in_flight.json();
  console.log(output.joke)
  return output.joke === undefined ? output.message : output.joke
};

export const HomePage = ({ joke }: { joke: string }) => {
  const is_joke_funny = joke === "penis";
  const [joke_remote, set_joke] = useState("");
  if (joke_remote === "") req().then((res) => set_joke(res));
  console.log(joke_remote)
  return (
    <SexyContainer>
      {!is_joke_funny && <BeautifulText>{joke_remote}</BeautifulText>}
      {is_joke_funny && <BeautifulText>grow up</BeautifulText>}
    </SexyContainer>
  );
};
