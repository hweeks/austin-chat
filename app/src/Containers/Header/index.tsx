import React,{ useState } from "react"
import LoginOut from "../Login-Logout"
import UserForm from "../UserForm"
import { HeaderWrapper } from "./styles"

const Header = () => {
  
  const [showForm,setShowForm] = useState(false)


  return(
    <HeaderWrapper>
      <LoginOut showForm={() => setShowForm(!showForm)}/>
      {showForm && <UserForm/>}
    </HeaderWrapper>
  )
}

export default Header