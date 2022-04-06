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
  store.subscribe(() => {
    console.log("current state", store.getState())
  })

  return(
    <Provider store={store}>
      <App />
    </Provider>
  )

}

const App = () => {
  const dispatch = useDispatch()
  const joke = useSelector(state => state.joke)

  useEffect(() => {
    dispatch(userVerification())
    dispatch(fetchJoke())
  },[])
  console.log(joke)

  
 return(
    <HomePage joke={joke.dailyJoke.joke || joke.error} author={joke.dailyJoke.author}/>
 )
}

// that place from /app/static/index-template.html
const home_node = document.getElementById("home");

// we gotta fetch the joke from the back end instead next!
window.onload = () => {
  ReactDOM.render(<WrappedApp />, home_node);
};
