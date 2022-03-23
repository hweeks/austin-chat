import React, { useRef } from "react";
import { useState } from "react/cjs/react.development";
import { UserFormWrapper } from "./styles";

interface user {
  username: string,
  password: string,
}

const UserForm = (props: any) => {
  
  const [newAccount, setNewAccount] = useState(false)
  const usernameInput = useRef()
  const passwordInput = useRef()
  const passwordCheckInput = useRef()
  const [errorMessage,setError] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const password = passwordInput.current?.value
    const passwordCheck = passwordCheckInput.current?.value
    const username = usernameInput.current?.value
    passwordValidated(password,passwordCheck)

    
  }

  const passwordValidated = (password: string, password2: string) => {
    let isValid = false
    const regex = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    if(password === password2){
      
    }
    else{
      setError("Passwords Must Match")
    }
  }

  return (
    <UserFormWrapper onSubmit={handleSubmit}>
      Username
      <input ref={usernameInput} placeholder="Username" required/>
      Password
      <input ref={passwordInput} type="password" placeholder="Password" required/>
      {newAccount &&  <> Re-Enter Password<input ref={passwordCheckInput}  placeholder="Re-Enter Password" required/></>}
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