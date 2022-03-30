import React, { useRef } from "react"
import { JokeInput, JokeWrapper } from "./styles"

const reqJokeCreation = async (joke: object) => {
  const in_flight = await fetch("/api/joke/create", {
    method: 'POST',
    body: JSON.stringify(joke),
    headers: {
      'Content-Type': "application/json"
    }
  });
  const response = await in_flight.json();
  return response
}

const JokeForm = () => {
 const jokeInput = useRef()

 const handleJokeCreation = () => {
   const new_joke = {
     new_joke: jokeInput.current?.value
   }
   console.log(new_joke)
    reqJokeCreation(new_joke).then(res =>{
      console.log(res)
    })
 }

  return(
    <JokeWrapper>
      <JokeInput ref={jokeInput} rows="3" cols="50" type="text" placeholder={`Put your "Original" joke here.`}/>
      <button onClick={() => handleJokeCreation()}>Submit Joke</button>
    </JokeWrapper>
  )
}

export default JokeForm