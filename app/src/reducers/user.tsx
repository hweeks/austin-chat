import { USER_NOT_VERIFIED, USER_VERIFIED, VERIFYING_USER } from "../actions";

interface stateObject {
  isLoading: boolean,
  isVerified: boolean,
  username: string
}

const initialState: stateObject = {
  isLoading: false,
  isVerified: false,
  username: ""
}

const verifyUser = (state: object) => {
  return {...state, isLoading: true}
}

const userVerified = (state: object, payload: string) => {
  return {...state, isLoading: false, isVerified: true, username: true}
}

const notVerified = (state: object) => {
  return {...state, isLoading: false, isVerified: false, username: ""}
}

export default (state: object = initialState, {type, payload}) => {
  switch(type) {
    case VERIFYING_USER:
      return verifyUser(state)
    case USER_VERIFIED:
      return userVerified(state, payload)
    case USER_NOT_VERIFIED:
      return notVerified(state)
    default:
      return state
  }
}