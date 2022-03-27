import { LoginOutButton } from "./styles"
import React, { useEffect } from "react"
import { useState } from "react"
import qs from "qs"

const deleteAllCookies = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}


const LoginOut = (props: any) => {
  const [token, setToken] = useState(qs.parse(document.cookie)['object Object'])
  
  const handleButton = () => {
    if(token) {
      deleteAllCookies()
      setToken(qs.parse(document.cookie)['object Object'])
    }
    else props.showForm() 
  }

  return(
    <>
      {!props.formShown && <LoginOutButton onClick={() => {handleButton()}}>{token ? "Log Out" : "Log In"}</LoginOutButton>}
    </>
  )
}

export default LoginOut