import { SET_JOKE, FAILED_JOKE, LOADING_JOKE, ADD_JOKE} from "../actions"

interface stateObject {
  dailyJoke: object,
  isLoading: boolean,
  error: string,
}

const initialState : stateObject = {
  dailyJoke: {},
  isLoading: false,
  error: null
}

export const loadingJoke = (state: any) => {
  return {...state, isLoading: true}
}

export const jokeRecieved = (state: stateObject, payload: object) => {
  return {...state, isLoading: false, dailyJoke: payload}
}

export const jokeErrored = (state: stateObject, payload: object) => {
  return {...state, isLoading: false, error: payload}
}

export const jokeCreated = (state: stateObject) => {
  return {...state, isLoading: false}
}

export default (state: stateObject = initialState, {type, payload}) => {
  switch(type) {
    case LOADING_JOKE:
      return loadingJoke(state)
    case SET_JOKE:
      return jokeRecieved(state,payload)
    case FAILED_JOKE:
      return jokeErrored(state,payload)
    case ADD_JOKE:
      return jokeCreated(state)
    default: 
      return state
  }
}