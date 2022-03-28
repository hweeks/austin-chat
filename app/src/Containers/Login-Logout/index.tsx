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
  
  const handleButton = () => {
    if(props.token) {
      deleteAllCookies()
      props.setToken('')
    }
    else props.showForm() 
  }

  return(
    <>
      {!props.formShown && <LoginOutButton onClick={() => {handleButton()}}>{props.token ? "Log Out" : "Log In"}</LoginOutButton>}
    </>
  )
}

export default LoginOut