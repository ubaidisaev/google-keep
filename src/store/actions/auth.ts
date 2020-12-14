import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { SIGNIN_SUCCESS, AUTH_ERROR_MESSAGE, AUTH_IN_PROGRESS, SIGNOUT_SUCCESS } from "./types";

import { auth } from "services/firebase";






export const setAuthInProgress = (payload: boolean) => {
  return {
    type: AUTH_IN_PROGRESS,
    payload
  };
};
export const setAuthMessage = (payload: any) => ({
  type: AUTH_ERROR_MESSAGE,
  payload: payload
});

export const authSuccess = (user: any) => ({
  type: SIGNIN_SUCCESS,
  payload: user
});

export const signoutSuccess = () => ({
  type: SIGNOUT_SUCCESS
});

export const signin = (email: string, password: string) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  dispatch(setAuthInProgress(true));
  dispatch(setAuthMessage(""));
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(setAuthInProgress(false));
      dispatch(authSuccess(auth.currentUser));
    })
    .catch(error => {
      dispatch(setAuthMessage(error.message));
      dispatch(setAuthInProgress(false));
    });
};

export const signout = () => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  auth
    .signOut()    
    .then(() => {
      dispatch(signoutSuccess());
    })
    .catch(error => {
      
    });
};



export const signup = (email: string, password: string, userName: string) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  dispatch(setAuthInProgress(true));
  dispatch(setAuthMessage(""));
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      if (auth.currentUser) {
        auth.currentUser.updateProfile({ displayName: userName });
        dispatch(setAuthInProgress(false));
        dispatch(authSuccess(auth.currentUser));
      }
    })
    .catch(error => {
      dispatch(setAuthMessage(error.message));
      dispatch(setAuthInProgress(false));
    });
};


export const resetpassword = (email: string) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  dispatch(setAuthInProgress(true));
  dispatch(setAuthMessage(""));
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
        const msg = "We have sent you an email with link to reset password";
        dispatch(setAuthMessage({message: msg, authMessageType: "success"}));
        dispatch(setAuthInProgress(false));
    })
    .catch(error => {
      dispatch(setAuthMessage({message: error.message, authMessageType: "error"}));
      dispatch(setAuthInProgress(false));
    });
};
