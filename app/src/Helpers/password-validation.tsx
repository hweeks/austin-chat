const errors = []

const passwordIsGirthy = (password: string, password2?: string) => {
  if(password.length < 8){
    errors.push("isnt girthy enough")
  }
}

const passwordIsntTooGirthy = (password: string, password2?: string) => {
  if(password.length > 16){
    errors.push("is too girthy")
  }
}

const passwordHasNumbers = (password: string, password2?: string) => {
  if(!password.split("").some(((x: any) => !isNaN(x)))){
    errors.push("needs numbers")
  }
}

const passwordsMatch = (password: string, password2: string) => {
  console.log(password + password2)
  if(password !== password2){
    errors.push('does not match')
  }
}

const functionArray = [passwordIsGirthy,passwordIsntTooGirthy,passwordHasNumbers,passwordsMatch]

export const passwordValidation = (password: string, password2: string) => {
  errors.splice(0,errors.length)
  functionArray.forEach((func) => func(password,password2))
  return errors
}
