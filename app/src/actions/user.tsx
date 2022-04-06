export const VERIFYING_USER = "VERIFYING_USER"
export const USER_VERIFIED = "USER_VERIFIED"
export const USER_NOT_VERIFIED = "USER_NOT_VERIFIED"
export const USER_FAILED = "USER_FAILED"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT_USER = "LOGOUT_USER"

const verifyUser = () => ({
  type: VERIFYING_USER
})

const userVerified = (payload: string) => ({
  type: USER_VERIFIED,
  payload
})

const notVerified = () => ({
  type: USER_NOT_VERIFIED
})

const createFailed = (payload: string) => ({
  type: USER_FAILED,
  payload
})

const loginFailed = (payload: string) => ({
  type: LOGIN_FAILED,
  payload
})

const logout = () => ({
  type: LOGOUT_USER
})

interface user {
  username: string,
  password: string,
}

const reqUserCreate = async (newUser: user) => {
  const in_flight = await fetch("/api/user/create", {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': "application/json"
    }
  });
  const output = await in_flight.json();
  return output
}

const reqLogin = async (user: user) => {
  const in_flight = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const output = await in_flight.json()
  return output
}

const deleteAllCookies = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}


const reqVerification = async () => {
  const req = await fetch("/api/user/verifyUser")
  const res = await req.json()
  return res
}

export const createUser = (newUser: user) => {
  return (dispatch) => {
    dispatch(verifyUser())
    return reqUserCreate(newUser).then(res => {
      if(res.username) dispatch(userVerified(res.username))
      else{
        dispatch(createFailed(res.error))
      }
    })
  }
}

export const loginUser = (user: user) => {
  return (dispatch) => {
    dispatch(verifyUser())
    return reqLogin(user).then(res => {
      if(res.username) dispatch(userVerified(res.username))
      else{
        dispatch(loginFailed(res.error))
      }
    })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    deleteAllCookies()
    return dispatch(logout())
  }
}

export const userVerification = () => {
  return (dispatch) => {
    dispatch(verifyUser)
    return reqVerification().then(res => {
      if(res.username) dispatch(userVerified(res.username))
      else {
        dispatch(notVerified())
      }
    })
  }
}

