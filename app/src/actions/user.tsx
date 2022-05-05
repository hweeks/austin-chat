export const VERIFYING_USER = "VERIFYING_USER"
export const USER_VERIFIED = "USER_VERIFIED"
export const USER_NOT_VERIFIED = "USER_NOT_VERIFIED"
export const USER_FAILED = "USER_FAILED"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT_USER = "LOGOUT_USER"
export const SHOW_FORM = "SHOW_FORM"

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

const formToggle = () => ({
  type: SHOW_FORM
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

const reqLogout = async () => {
  return (await fetch('/api/user/logout'))
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
      if(res.username) {
        dispatch(userVerified(res.username))
        dispatch(formToggle())
      }
      else if(res.message) dispatch(createFailed(res.message))
    })
  }
}

export const loginUser = (user: user) => {
  return (dispatch) => {
    dispatch(verifyUser())
    return reqLogin(user).then(res => {
      if(res.username) {
        dispatch(userVerified(res.username))
        dispatch(formToggle())
      }
      else{
        dispatch(loginFailed(res.message))
      }
    })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    return reqLogout().then(res => {
      dispatch(logout())
      // else alert("Error occured when logging out.")
    })
  }
}

export const userVerification = () => {
  return (dispatch) => {
    dispatch(verifyUser())
    return reqVerification().then(res => {
      if(res.username) dispatch(userVerified(res.username))
      else {
        dispatch(notVerified())
      }
    })
  }
}

export const toggleForm = () => {
  return (dispatch) => {
    dispatch(formToggle())
  }
}
