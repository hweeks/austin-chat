import React, { useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux"
import ReactDOM from "react-dom";
import { HomePage } from "./Containers/Home";
import { fetchJoke } from "./actions";
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

const App = () => {
  const dispatch = useDispatch()
  const joke = useSelector(state => state.joke)

  useEffect(() => {
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
