import { LoginOutButton } from "./styles"
import React from "react"
import { useSelector } from "react-redux"

const LoginOut = (props: any) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  const handleButton = () => {
    if(!isLoggedIn) {
      props.showForm()
    }
  }

  return(
    <>
      {!props.formShown && <LoginOutButton onClick={() => {handleButton()}}>{isLoggedIn ? "Log Out" : "Log In"}</LoginOutButton>}
    </>
  )
}

export default LoginOut