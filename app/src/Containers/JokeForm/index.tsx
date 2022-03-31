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

 const errorHandler = (code: number) => {
   if(code === 11000){
     alert("Be original, dont steal jokes... got back to reddit.")
   }
 }

 const handleJokeCreation = () => {
   const new_joke = {
     new_joke: jokeInput.current?.value
   }
    reqJokeCreation(new_joke).then(res =>{
      if(res.code) errorHandler(res.code)
      else {
        jokeInput.current.value = ""
      }
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