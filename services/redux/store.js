import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";

const initState = {};

const modalReducer = (state = false, action) => {
  switch (action.type) {
    case "SHOW":
      return true;
    case "HIDE":
      return false;
    default:
      return state;
  }
};

export const initStore = (initialState = initState) =>
  createStore(
    reducers,
    initialState,
    modalReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
