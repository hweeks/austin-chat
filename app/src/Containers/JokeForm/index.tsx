import React, { useRef, useState } from "react"
import { JokeInput, JokeWrapper, SubmitButton } from "./styles"
import { useDispatch, useSelector } from "react-redux"
import { addJoke } from "../../actions"

const JokeForm = () => {
 const jokeInput = useRef()
 const dispatch = useDispatch()
 const joke = useSelector(state => state.joke)
 const [error,setError] = useState(joke.error)

 const handleJokeCreation = () => {
   const joke = jokeInput.current?.value
   const new_joke = {
     new_joke: joke
   }
   if(joke <= 0) {
      setError("Please enter a joke.")
      setTimeout(() => {
        setError('')
      }, 6000);
   }
   else {
    dispatch(addJoke(new_joke))
   }
 }

  return(
    <JokeWrapper>
      <JokeInput ref={jokeInput} rows="3" cols="50" type="text" placeholder={`Put your "Original" joke here.`}/>
      <SubmitButton disabled={joke.isLoading} onClick={() => handleJokeCreation()}>{joke.isLoading ? "Sending" : "Submit Joke"}</SubmitButton>
      {error && <div>{error}</div>}
    </JokeWrapper>
  )
}

export default JokeForm