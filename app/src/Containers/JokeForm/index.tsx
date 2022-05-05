import React, { useState } from "react"
import { JokeInput, JokeWrapper, SubmitButton } from "./styles"
import { useDispatch, useSelector } from "react-redux"
import { addJoke } from "../../actions"

const JokeForm = () => {
 const [jokeInput,setJoke] = useState("")
 const dispatch = useDispatch()
 const joke = useSelector(state => state.joke)
 const [error,setError] = useState(joke.error)

 const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
   setJoke(event.currentTarget.value)
 }

 const handleJokeCreation = (joke: string) => {
   if(!jokeInput){
     setError("Please enter a joke")
     return setTimeout(() => setError(""),6000)
   }
   return dispatch(addJoke(joke))
 }

  return(
    <JokeWrapper>
      <JokeInput onChange={handleInput} value={jokeInput} rows="3" cols="50" type="text" placeholder={`Put your "Original" joke here.`}/>
      <SubmitButton disabled={joke.isLoading} onClick={() => handleJokeCreation(jokeInput)}>{joke.isLoading ? "Sending" : "Submit Joke"}</SubmitButton>
      <div>{joke.error}</div>
    </JokeWrapper>
  )
}

export default JokeForm