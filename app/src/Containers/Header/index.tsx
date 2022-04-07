import React,{ useState } from "react"
import LoginOut from "../Login-Logout"
import UserForm from "../UserForm"
import { HeaderWrapper, UsernameH2 } from "./styles"
import { useSelector } from "react-redux"

const Header = (props: any) => {
  const user = useSelector(state => state.user.username)
  const [showForm,setShowForm] = useState(false)


  return(
    <HeaderWrapper>
      <UsernameH2>{user}</UsernameH2>
      <LoginOut  {...props}  formShown={showForm} showForm={() => setShowForm(!showForm)}/>
      {showForm && <UserForm showForm={() => setShowForm(!showForm)}/>}
    </HeaderWrapper>
  )
}

export default Header