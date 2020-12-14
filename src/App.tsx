import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
} from "@material-ui/core";

import { authSuccess } from "store/actions/auth";
import { configDatabase } from "store/actions/database";
import { auth } from "services/firebase";

import Login from "components/login/Login";
import Main from "components/Main";

import AppBar from "components/navbar/AppBar";

import { dark, light } from "components/theme";
import Loading from "components/Loading";

let theme = createMuiTheme();



const App = ({ isLoggedIn, authSuccess, configDatabase  }) => {
  const [isDarkMode, setThemeMode] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isNavBarOpen, setNavBarOpen] = useState<boolean>(true);
  const setTheme = () => {
    setThemeMode(!isDarkMode);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        authSuccess(user);
        configDatabase();
        setIsAuthenticating(false);
      } else {
        setIsAuthenticating(false);
      }

    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticating) return <Loading />;

  return (
    <>
      <CssBaseline />
      {isLoggedIn ? (
        <ThemeProvider theme={isDarkMode ? dark : light}>
          <CssBaseline />
          <AppBar
            switchTheme={setTheme}
            isNavBarOpen={isNavBarOpen}
            setNavBarOpen={setNavBarOpen}
          />
          <Main isNavBarOpen={isNavBarOpen} />
        </ThemeProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: any) => ({
  authSuccess: (user: any) => dispatch(authSuccess(user)),
  configDatabase: () => dispatch(configDatabase()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
