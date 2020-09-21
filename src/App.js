import "./App.scss";

import React, { useEffect } from "react";

import PrivateRoute from "./Components/Routing/privateComponent";
import PublicRoute from "./Components/Routing/publicComponent";
import LoginSignUp from "./Components/login_signUp.page";
import Products from "./Components/products.page";
import Cart from "./Components/cart.page";

import { Switch, Route, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, userLogIn, userLogOut } from "./Redux/userSlice";

import { onStateChanged } from "./Firebase/auth";
import { setUserDB } from "./Firebase/db";

function App() {
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onStateChanged((userObj) => {
      if (userObj) {
        dispatch(userLogIn(JSON.stringify(userObj)));
      } else {
        dispatch(userLogOut());
      }
    });
  }, [dispatch, userState]);

  if (userState.logged_in) {
    const user = JSON.parse(userState.user);
    setUserDB(user.email, {
      name: user.email,
      products: {},
    });
  }

  return (
    <div className="App">
      <Switch>
        <PrivateRoute
          exact
          path="/products"
          authenticated={userState.logged_in}
          component={Products}
        />
        <PublicRoute
          exact
          path="/login"
          authenticated={userState.logged_in}
          component={LoginSignUp}
        />
        <PrivateRoute
          exact
          path="/cart"
          authenticated={userState.logged_in}
          component={Cart}
        />

        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default App;
