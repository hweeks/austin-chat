import React from "react"
import { JokeInput, JokeWrapper } from "./styles"

const JokeForm = () => {
  return(
    <JokeWrapper>
      <JokeInput rows="3" cols="50" type="text" placeholder={`Put your "Original" joke here.`}/>
      <button>Submit Joke</button>
    </JokeWrapper>
  )
}

export default JokeForm