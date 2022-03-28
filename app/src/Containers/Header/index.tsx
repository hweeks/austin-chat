import React,{ useState } from "react"
import LoginOut from "../Login-Logout"
import UserForm from "../UserForm"
import { HeaderWrapper } from "./styles"

const Header = (props: any) => {
  
  const [showForm,setShowForm] = useState(false)


  return(
    <HeaderWrapper>
      <LoginOut  {...props}  formShown={showForm} showForm={() => setShowForm(!showForm)}/>
      {showForm && <UserForm setToken={props.setToken} showForm={() => setShowForm(!showForm)}/>}
    </HeaderWrapper>
  )
}

export default Header