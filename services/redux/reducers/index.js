import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import Login from "../reducers/AuthReducer";

const appReducer = combineReducers({
  Login,
  form: formReducer,
});

export default appReducer;
