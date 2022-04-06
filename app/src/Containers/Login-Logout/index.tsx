import { LoginOutButton } from "./styles"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../../actions"

const LoginOut = (props: any) => {
  const isLoggedIn = useSelector(state => state.user.isVerified)
  const dispatch = useDispatch()

  const handleButton = () => {
    if(!isLoggedIn) {
      props.showForm()
    }
    else{
      dispatch(logoutUser())
    }
  }

  return(
    <>
      {!props.formShown && <LoginOutButton onClick={() => {handleButton()}}>{isLoggedIn ? "Log Out" : "Log In"}</LoginOutButton>}
    </>
  )
}

export default LoginOut