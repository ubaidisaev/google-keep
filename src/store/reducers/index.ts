import { combineReducers } from "redux";
import { SIGNOUT_SUCCESS } from 'store/actions/types';

import authReducer from "./authReducer";
import labelsReducer from "./labelsReducer";
import notesReducer from "./notesReducer";

// export default combineReducers({
//   auth: authReducer,
//   labels: labelsReducer,
//   note: notesReducer
// });


const appReducer = combineReducers({
  auth: authReducer,
  labels: labelsReducer,
  note: notesReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === SIGNOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;