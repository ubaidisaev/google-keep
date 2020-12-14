import { Reducer, AnyAction } from "redux";
import {
  AUTH_IN_PROGRESS,
  SIGNIN_SUCCESS,
  AUTH_ERROR_MESSAGE,
  SIGNOUT_SUCCESS,
} from "store/actions/types";

interface IStore {
  user: {
    isLoggedIn: boolean;
    displayName: string | null;
    userEmail: string | null;
    userID: string | null;
  };
  inProgress: boolean;
  authMessage: string;
  authMessageType: "success" | "error";
}

const InitialState: IStore = {
  user: {
    isLoggedIn: false,
    displayName: null,
    userEmail: null,
    userID: null,
  },
  inProgress: false,
  authMessage: "",
  authMessageType: "error",
};

const authReducer: Reducer<IStore> = (
  state: IStore = InitialState,
  action: AnyAction
): IStore => {
  switch (action.type) {
    case AUTH_IN_PROGRESS:
      return {
        ...state,
        inProgress: action.payload,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          displayName: action.payload.displayName,
          userEmail: action.payload.email,
          userID: action.payload.uid,
        },
      };
    case SIGNOUT_SUCCESS:
      return {
        ...InitialState,
        user: InitialState.user,
      };
    case AUTH_ERROR_MESSAGE:
      return {
        ...state,
        authMessage: action.payload.message,
        authMessageType: action.payload.messageType,
      };
    default:
      return state;
  }
};

export default authReducer;
