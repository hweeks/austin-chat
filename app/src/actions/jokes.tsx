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
  const jokeRes = await jokeReq.json()
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
      if(res.complete) dispatch(createJoke())
      else if(!res.success) dispatch(jokeFailed(res.message))
    })
  }
}

export const fetchJoke = () => {
  return (dispatch) => {
    dispatch(jokeLoading())
    return reqJoke().then(res => {
      console.log(res)
      if(res.joke) dispatch(setJoke(res))
      if(!res.success) dispatch(jokeFailed(res.message))
    })
  }
}