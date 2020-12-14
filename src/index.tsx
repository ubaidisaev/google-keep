import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "App";



import { Provider } from "react-redux";

import store from "store";


// auth example google
//https://medium.com/better-programming/dead-simple-auth-with-react-and-firebase-592e40ff43c5
//https://medium.com/better-programming/dead-simple-auth-with-react-and-firebase-part-ii-c32963e21e16

//googlekeep-anselm94.herokuapp.com

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);
