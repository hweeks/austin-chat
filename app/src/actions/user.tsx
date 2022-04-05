export const VERIFYING_USER = "VERIFYING_USER"
export const USER_VERIFIED = "USER_VERIFIED"
export const USER_NOT_VERIFIED = "USER_NOT_VERIFIED"

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

export const userVerification = () => {
  return (dispatch) => {
    dispatch(verifyUser)
    return reqVerification().then(res => {
      if(res.username) dispatch(userVerified(res.username))
      else {
        deleteAllCookies()
        dispatch(notVerified())
      }
    })
  }
}

