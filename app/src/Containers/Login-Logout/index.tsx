import { LoginOutButton } from "./styles"
import React from "react"
import { useState } from "react"

const LoginOut = (props: any) => {
  const [isLoggedIn,setLogged] = useState(false)
  return(
    <LoginOutButton onClick={() => {
      setLogged(!isLoggedIn) 
      props.showForm()
    }}>{isLoggedIn ? "Log Out" : "Log In"}</LoginOutButton>
  )
}

export default LoginOut