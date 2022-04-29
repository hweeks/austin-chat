import { Login } from "./styles"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleForm } from "../../actions"

const LoginOut = () => {
  const dispatch = useDispatch()
  const formShown = useSelector(state => state.user.formShown)
  return(
    <>
      {!formShown && <Login onClick={() => dispatch(toggleForm())}>Log In</Login>}
    </>
  )
}

export default LoginOut