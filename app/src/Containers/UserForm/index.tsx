import React, { useState } from "react";
import { passwordValidation } from "../../Helpers/password-validation";
import { UserFormWrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux"
import { createUser, loginUser, toggleForm } from "../../actions";

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

interface userInfoInt {
  username: string,
  password: string,
  passCheck: string
}

const UserForm = () => {
  const [newAccount, setNewAccount] = useState(false)
  const [userInfo, setUserInfo] = useState<userInfoInt>({})
  const [errorMessage,setError] = useState('')
  const error = useSelector(state => state.user.error)
  const dispatch = useDispatch()

  const handleCreate = () => {
    const checkForErrors = passwordValidation(userInfo.password ,userInfo.passCheck)
    if(checkForErrors.length <= 0){
      dispatch(createUser(userInfo))
    }
    else if(checkForErrors){
      setError(`The password ${checkForErrors.join(" & ")}.`)
    }
  }

  const handleLogin = (userInfo: user) => {
    dispatch(loginUser(userInfo))
  }

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    const user : user = {
      username: userInfo.username,
      password: userInfo.password
    }
    if(newAccount) handleCreate()
    else handleLogin(user)
  }

  return (
    <UserFormWrapper onSubmit={handleSubmit}>
      Username
      <input onChange={handleInputChange} name="username" placeholder="Username" required/>
      Password
      <input onChange={handleInputChange} name="password" type="password" placeholder="Password" required/>
      {newAccount &&  
        <>
          Re-Enter Password
          <input onChange={handleInputChange} name="passCheck"  placeholder="Re-Enter Password" required/>
        </>}
      <div>
      <label>{errorMessage || error}</label>
      </div>
      <button type="submit">{newAccount ? "Create" : "Login"}</button>
      <button type="button" onClick={() => dispatch(toggleForm())}>Back</button>
      <button type="button" onClick={() => setNewAccount(!newAccount)}>{newAccount ? "Already Have an Account?" : "New User?"}</button>
    </UserFormWrapper>
  )
}

export default UserForm