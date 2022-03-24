import React, { useRef, useState } from "react";
import { passwordValidation } from "../../Helpers/password-validation";
import { UserFormWrapper } from "./styles";

interface user {
  username: string,
  password: string,
}

const reqUserCreate = async (newUser: object) => {
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

const UserForm = (props: any) => {
  
  const [newAccount, setNewAccount] = useState(false)
  const usernameInput = useRef()
  const passwordInput = useRef()
  const passwordCheckInput = useRef()
  const [errorMessage,setError] = useState('')

  const handleCreate = (userInfo: user, passwordCheck: string) => {
    const checkForErrors = passwordValidation(userInfo.password ,passwordCheck)
    if(checkForErrors.length <= 0){
      reqUserCreate(userInfo).then(res => {
        return res
      })
    }
    else if(checkForErrors){
      setError(`The password ${checkForErrors.join(" & ")}.`)
    }
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