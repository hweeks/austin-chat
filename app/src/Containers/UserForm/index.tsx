import React, { useRef, useState } from "react";
import { passwordValidation } from "../../Helpers/password-validation";
import { UserFormWrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux"
import { createUser, loginUser } from "../../actions";

const creationErrorHandler = (res: any) => {
  if(res.code === 11000){
    alert("That username is already in use.")
    return false
  }
}

interface user {
  username: string,
  password: string,
}

const loginErrorHandler = (res: any) => {
  //needing assistance here
}

const UserForm = (props: any) => {
  const [newAccount, setNewAccount] = useState(false)
  const usernameInput = useRef()
  const passwordInput = useRef()
  const passwordCheckInput = useRef()
  const [errorMessage,setError] = useState('')
  const dispatch = useDispatch()
  const isVerified = useSelector(state => state.user.isVerified)

  const handleCreate = (userInfo: user, passwordCheck: string) => {
    const checkForErrors = passwordValidation(userInfo.password ,passwordCheck)
    if(checkForErrors.length <= 0){
      dispatch(createUser(userInfo))
      props.showForm()
    }
    else if(checkForErrors){
      setError(`The password ${checkForErrors.join(" & ")}.`)
    }
  }

  const handleLogin = (userInfo: user) => {
    dispatch(loginUser(userInfo))
    props.showForm()
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const password = passwordInput.current?.value
    const passwordCheck = passwordCheckInput.current?.value
    const username = usernameInput.current?.value
    const userInfo : user = {
      username,
      password
    }
    if(newAccount) handleCreate(userInfo,passwordCheck)
    else handleLogin(userInfo)
  }

  return (
    <UserFormWrapper onSubmit={handleSubmit}>
      Username
      <input ref={usernameInput} placeholder="Username" required/>
      Password
      <input ref={passwordInput} type="password" placeholder="Password" required/>
      {newAccount &&  
        <>
          Re-Enter Password
          <input ref={passwordCheckInput}  placeholder="Re-Enter Password" required/>
        </>}
      <div>
      <label>{errorMessage}</label>
      </div>
      <button type="submit">{newAccount ? "Create" : "Login"}</button>
      <button type="button" onClick={props.showForm}>Back</button>
      <button type="button" onClick={() => setNewAccount(!newAccount)}>{newAccount ? "Already Have an Account?" : "New User?"}</button>
    </UserFormWrapper>
  )
}

export default UserForm