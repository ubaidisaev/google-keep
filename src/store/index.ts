
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from 'store/reducers';


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//window.store = store;

export default store;
