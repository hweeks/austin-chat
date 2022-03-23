import React, { useRef, useState } from "react";
import { passwordValidation } from "../../Helpers/password-validation";
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

  const reqUserCreate = async (newUser: object) => {
    const in_flight = await fetch("/api/user/create", {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': "application/json"
      }
    });
    const output = await in_flight.json();
    return output.joke === undefined ? output.message : output.joke
  };

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const password = passwordInput.current?.value
    const passwordCheck = passwordCheckInput.current?.value
    const username = usernameInput.current?.value
    const passChecked = passwordValidation(password,passwordCheck)
    if(passChecked.isValid && passwordCheck){
      const newUser = {
        username,
        password
      }
      reqUserCreate(newUser)
    }
    else if(passChecked.errors){
      console.log(passChecked.errors)
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