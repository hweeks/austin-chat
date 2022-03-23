const errors = []

const passwordIsGirthy = (password: string) => {
  let isValid : boolean = false
  if(password.length >= 8){
    isValid = true
  }
  if(!isValid) errors.push("isn't girthy enough")
  return isValid
}

const passwordIsntTooGirthy = (password: string) => {
  let isValid : boolean = false
  if(password.length <= 16){
    isValid = true
  }
  if(!isValid) errors.push("is too girthy")
  return isValid
}

const passwordHasNumbers = (password: string) => {
  let isValid : boolean = false
  if(password.split("").some(((x: any) => !isNaN(x)))){
    isValid = true
  }
  if(!isValid) errors.push("needs numbers")
  return isValid
}

const functionArray = [passwordIsGirthy,passwordIsntTooGirthy,passwordHasNumbers]

export const passwordValidation = (password: string, password2: string) => {
  if(password === password2)
  return {
    errors: errors,
    isValid: functionArray.every((func) => func(password))
  }
}
