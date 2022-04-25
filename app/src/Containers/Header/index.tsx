import React,{ useState } from "react"
import Login from "../Login"
import Logout from "../Logout"
import UserForm from "../UserForm"
import { HeaderWrapper, UsernameH2 } from "./styles"
import { useSelector } from "react-redux"

const Header = () => {
  const user = useSelector(state => state.user)


  return(
    <HeaderWrapper>
      <UsernameH2>{user.username}</UsernameH2>
      {user.isVerified && <Logout/>}
      {!user.isVerified && !user.formShown && <Login/>}
      {user.formShown && <UserForm />}
    </HeaderWrapper>
  )
}

export default Header