import React,{ useState } from "react"
import LoginOut from "../Login-Logout"
import UserForm from "../UserForm"
import { HeaderWrapper } from "./styles"

const Header = () => {
  
  const [showForm,setShowForm] = useState(false)


  return(
    <HeaderWrapper>
      <LoginOut formShown={showForm} showForm={() => setShowForm(!showForm)}/>
      {showForm && <UserForm showForm={() => setShowForm(!showForm)}/>}
    </HeaderWrapper>
  )
}

export default Header