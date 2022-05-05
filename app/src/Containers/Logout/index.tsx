import { Logout } from "./styles"
import React from "react"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../actions"

const LoginOut = () => {
  const dispatch = useDispatch()
  return(
    <>
      <Logout onClick={() => dispatch(logoutUser())}>Log Out</Logout>
    </>
  )
}

export default LoginOut