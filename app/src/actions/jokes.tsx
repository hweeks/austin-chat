export const SET_JOKE = "SET_JOKE";
export const ADD_JOKE = "ADD_JOKE";
export const FAILED_JOKE = "FAILED_JOKE";
export const LOADING_JOKE = "LOADING_JOKE"

const fetchingJoke = () => ({
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

export const reqJoke = async () => {
  const jokeReq = await fetch('/api/joke/get')
  const jokeRes = await jokeReq.json()
  return jokeRes
} 

export const fetchJoke = () => {
  return (dispatch) => {
    dispatch(fetchingJoke())
    return reqJoke().then(res => {
      if(res.joke) dispatch(setJoke(res.joke))
      else if(res.error) dispatch(jokeFailed(res.message))
    })
  }
}