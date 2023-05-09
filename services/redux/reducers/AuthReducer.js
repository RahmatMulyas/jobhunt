import { Cookies } from "react-cookie";
import { errorMessage } from "@helpers/messageError";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILED,
} from "../actions/LoginAction.js";

import jwtAuthentication from "@helpers/jwtAuthentication";

const cookies = new Cookies();

const localToken = jwtAuthentication.checkExpirity(cookies.get("id_token"));

const initState = {
  isFetching: false,
  isAuthenticated: !!localToken.token,
  isLoading: false,
  data: null,
  dataRole: [],
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: "",
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: "",
        isLoading: false,
      };
    case LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: errorMessage(action.message),
        isLoading: false,
      };
    }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        isLoading: false,
      };

    case RESET_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true,
      };

    case RESET_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false,
      };

    case RESET_FAILED:
      return {
        ...state,
        isLoadingSubmit: false,
      };

    default:
      return state;
  }
}
