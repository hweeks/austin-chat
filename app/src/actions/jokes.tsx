import {get_server_url} from "../helpers"
export const SET_JOKE = "SET_JOKE";
export const ADD_JOKE = "ADD_JOKE";
export const FAILED_JOKE = "FAILED_JOKE";
export const LOADING_JOKE = "LOADING_JOKE"

const jokeLoading = () => ({
  type: LOADING_JOKE
})

const setJoke = (payload: string) => ({
  type: SET_JOKE,
  payload
})

const jokeFailed = (payload: string) => ({
  type: FAILED_JOKE,
  payload
})

const createJoke = () => ({
  type: ADD_JOKE
})

export const reqJoke = async () => {
  const jokeReq = await fetch(get_server_url("/api/joke/get"))
  const jokeRes = await jokeReq.json()
  return jokeRes
} 

const reqCreateJoke = async (joke: string) => {
  const new_joke = {
    joke
  }
  const req = await fetch(get_server_url('/api/joke/create'),{
    body: JSON.stringify(new_joke),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const response = await req.json()
  return response
}

export const addJoke = (joke: string) => {
  return (dispatch) => {
    dispatch(jokeLoading())
    return reqCreateJoke(joke).then(res => {
      if(res.complete) dispatch(createJoke())
      else if(!res.success) dispatch(jokeFailed(res.message))
    })
  }
}

export const fetchJoke = () => {
  return (dispatch) => {
    dispatch(jokeLoading())
    return reqJoke().then(res => {
      if(res.joke) dispatch(setJoke(res))
      if(!res.success) dispatch(jokeFailed(res.message))
    })
  }
}