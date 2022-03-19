import React, { useState } from "react";
import { BeautifulText, SexyContainer } from "./styles";

const req = async () => {
  const in_flight = await fetch("/api/a-joke");
  const output = await in_flight.json();
  return output.joke;
};

export const HomePage = ({ joke }: { joke: string }) => {
  const is_joke_funny = joke === "penis";
  const [joke_remote, set_joke] = useState("");
  debugger;
  if (joke_remote === "") req().then((res) => set_joke(res));
  return (
    <SexyContainer>
      {!is_joke_funny && <BeautifulText>{joke_remote}</BeautifulText>}
      {is_joke_funny && <BeautifulText>grow up</BeautifulText>}
    </SexyContainer>
  );
};
