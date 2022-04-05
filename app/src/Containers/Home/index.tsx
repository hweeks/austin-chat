import React from "react";
import { BeautifulText, SexyContainer } from "./styles";
import Header from "../Header";
import JokeForm from "../JokeForm";
import { useSelector } from "react-redux"

export const HomePage = ({ joke }: { joke: string }) => {
  const is_joke_funny = joke === "penis";
  const user = useSelector(state => state.user)
  

  return (
    <SexyContainer>
      <Header />
      {user.isVerified && <JokeForm/>}
      {!is_joke_funny && <BeautifulText>{joke}</BeautifulText>}
      {is_joke_funny && <BeautifulText>grow up</BeautifulText>}
    </SexyContainer>
  );
};
