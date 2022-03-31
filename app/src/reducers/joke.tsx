import { SET_JOKE, ADD_JOKE, FAILED_JOKE, LOADING_JOKE} from "../actions"

interface stateObject {
  jokes: Array<string>,
  dailyJoke: string,
  isLoading: boolean,
  error: any,
}

const initialState : stateObject = {
  jokes: [],
  dailyJoke: "",
  isLoading: false,
  error: null
}

export const loadingJoke = (state: any) => {
  return {...state, isLoading: true}
}

export const jokeRecieved = (state: object, payload: object) => {
  return {...state, isLoading: false, dailyJoke: payload}
}

export const jokeErrored = (state: object, payload: object) => {
  return {...state, isLoading: false, error: payload}
}

export default (state: object = initialState, {type, payload}) => {
  switch(type) {
    case LOADING_JOKE:
      return loadingJoke(state)
    case SET_JOKE:
      return jokeRecieved(state,payload)
    case FAILED_JOKE:
      return jokeErrored(state,payload)
    default: 
      return state
  }
}