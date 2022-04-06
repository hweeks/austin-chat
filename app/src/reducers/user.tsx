import { USER_NOT_VERIFIED, USER_VERIFIED, VERIFYING_USER, USER_FAILED, LOGOUT_USER } from "../actions";

interface stateObject {
  isLoading: boolean,
  isVerified: boolean,
  username: string,
  error: string
}

const initialState: stateObject = {
  isLoading: false,
  isVerified: false,
  username: "",
  error: ""
}

const verifyUser = (state: stateObject) => {
  return {...state, isLoading: true}
}

const userVerified = (state: stateObject, payload: string) => {
  return {...state, isLoading: false, isVerified: true, username: payload}
}

const notVerified = (state: stateObject) => {
  return {...state, isLoading: false, isVerified: false, username: ""}
}

const logoutUser = (state: stateObject) => {
  return {...state, isLoading: false, isVerified: false, username: ""}
}

const createFailed = (state: stateObject, payload: string) => {
  return {...state, isLoading: false, error: payload}
}

export default (state: stateObject = initialState, {type, payload}) => {
  switch(type) {
    case VERIFYING_USER:
      return verifyUser(state)
    case USER_VERIFIED:
      return userVerified(state, payload)
    case USER_NOT_VERIFIED:
      return notVerified(state)
    case USER_FAILED:
      return createFailed(state, payload)
    case LOGOUT_USER:
      return logoutUser(state)
    default:
      return state
  }
}