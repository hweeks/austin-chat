import React from "react";
import { useState } from "react/cjs/react.development";
import { UserFormWrapper } from "./styles";

const UserForm = () => {
  const [newAccount, setNewAccount] = useState(false)
  return (
    <UserFormWrapper>
      <button>X</button>
      <input placeholder="Username"/>
      <input placeholder="Email"/>
      <input placeholder="Password"/>
      {newAccount && <input placeholder="Re-Enter Password"/>}
      <button type="button" onClick={() => setNewAccount(!newAccount)}>{newAccount ? "Already Have an Account?" : "New User?"}</button>
    </UserFormWrapper>
  )
}

export default UserForm