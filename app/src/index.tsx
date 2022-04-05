import React, { useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux"
import ReactDOM from "react-dom";
import { HomePage } from "./Containers/Home";
import { fetchJoke, userVerification } from "./actions";
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from "./reducers";

const WrappedApp = () => {
  const store = createStore(reducers, applyMiddleware(thunkMiddleware))

  return(
    <Provider store={store}>
      <App />
    </Provider>
  )

}

const deleteAllCookies = () => {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const reqVerification = async () => {
  const in_flight = await fetch("/api/user/verifyUser")
  const response = await in_flight.json()
  return response
}

const App = () => {
  const dispatch = useDispatch()
  const joke = useSelector(state => state.joke)

  useEffect(() => {
    dispatch(userVerification())
    dispatch(fetchJoke())
  },[])

  
 return(
    <HomePage joke={joke.dailyJoke || joke.error}/>
 )
}

// that place from /app/static/index-template.html
const home_node = document.getElementById("home");

// we gotta fetch the joke from the back end instead next!
window.onload = () => {
  ReactDOM.render(<WrappedApp />, home_node);
};
