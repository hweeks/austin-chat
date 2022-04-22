import joke from "../reducers/joke";

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
  const jokeReq = await fetch('/api/joke/get')
  const jokeRes = await jokeReq.status === 404 ? jokeReq : jokeReq.json()
  return jokeRes
} 

const reqCreateJoke = async (joke: object) => {
  const req = await fetch('/api/joke/create',{
    body: JSON.stringify(joke),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const response = await req.json()
  return response
}

export const addJoke = (joke: object) => {
  return (dispatch) => {
    dispatch(jokeLoading())
    return reqCreateJoke(joke).then(res => {
      console.log(res)
      dispatch(createJoke())
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export const fetchJoke = () => {
  return (dispatch) => {
    dispatch(jokeLoading())
    return reqJoke().then(res => {
      if(res.joke) dispatch(setJoke(res))
      else if(res.status === 404) dispatch(jokeFailed("No Jokes, No Content"))
    })
  }
}