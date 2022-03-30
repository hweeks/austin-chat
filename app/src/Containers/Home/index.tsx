import React, { useState, useEffect } from "react";
import { BeautifulText, SexyContainer } from "./styles";
import Header from "../Header";
import JokeForm from "../JokeForm";
import qs from "qs"

export const HomePage = ({ joke }: { joke: string }) => {
  const is_joke_funny = joke === "penis";
  const [token, setToken] = useState(qs.parse(document.cookie).token)
  
  return (
    <SexyContainer>
      <Header setToken={setToken} token={token}/>
      {token && <JokeForm/>}
      {!is_joke_funny && <BeautifulText>{joke}</BeautifulText>}
      {is_joke_funny && <BeautifulText>grow up</BeautifulText>}
    </SexyContainer>
  );
};
