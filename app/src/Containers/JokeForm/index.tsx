import React, { useRef } from "react"
import { JokeInput, JokeWrapper } from "./styles"

const reqJokeCreation = async (joke: string) => {
  const in_flight  = fetch('api/joke/create', {
    method: "POST",
    body: JSON.stringify(joke),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const output = (await in_flight).json()
  return output
}

const JokeForm = () => {
 const jokeInput = useRef()

 const handleJokeCreation = () => {
    reqJokeCreation(jokeInput.current?.value).then(res =>{
      console.log(res)
    })
 }

  return(
    <JokeWrapper>
      <JokeInput rows="3" cols="50" type="text" placeholder={`Put your "Original" joke here.`}/>
      <button ref={jokeInput} onClick={() => handleJokeCreation()}>Submit Joke</button>
    </JokeWrapper>
  )
}

export default JokeForm