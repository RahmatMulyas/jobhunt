import { Cookies } from "react-cookie";
import { COMMON_HEADER_TOKEN } from "@config/constant";
import { successToastReturn } from "@helpers/handleCallApi";
import swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import axios from "axios";
const cookies = new Cookies();

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_REQUEST";
export const REGISTER_FAILURE = "REGISTER_REQUEST";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const RESET_REQUEST = "RESET_REQUEST";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_FAILED = "RESET_FAILED";

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: data.token,
  };
}

function requestDaftar(creds) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

function receiveDaftar() {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: null,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function setLogin(response) {
  cookies.set("token", `Bearer ${response.data.token}`, {
    path: "/",
  });
  cookies.set("Email", `${response.data.data.Email}`, {
    path: "/",
  });
  cookies.set("Username", `${response.data.data.Username}`, {
    path: "/",
  });
  const decoded = jwt_decode(response.data.token);
}

function setRegister(response) {}

export function loginUser(data) {
  const headers = {
    "Content-Type": "application/json",
  };

  return (dispatch) => {
    dispatch(requestLogin(data));
    return axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_API_URL + "/data_user/masuk",
      headers: headers,
      data: data,
    }).then(
      (response) => {
        dispatch(receiveLogin(response.data));
        const decoded = jwt_decode(response.data.token);
        setLogin(response);
        window.location.href = "/datapegawai/menu";
      },
      (error) => {
        dispatch(
          loginError(error?.response?.data?.message || "Login Error"),
          swal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.response?.data?.message || "Something error",
          })
        );
      }
    );
  };
}

export function registerUser(data) {
  const headers = {
    "Content-Type": "application/json",
  };

  return (dispatch) => {
    dispatch(requestDaftar(data));
    return axios({
      method: "post",
      url: "https://klinikme-test-api.herokuapp.com/api/v1/data_user/daftar",
      headers: null,
      data: data,
    }).then(
      (response) => {
        dispatch(receiveDaftar(response.data));
        setRegister(response);
        window.location.href = "/login/jobhunt";
      },
      (error) => {
        dispatch(
          loginError(error?.response?.data?.message || "Login Error"),
          swal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.response?.data?.message || "Something error",
          })
        );
      }
    );
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

export function logoutUser(dispatch) {
  return () => {
    dispatch(requestLogout());
    cookies.remove("token", { path: "/" });
    dispatch(receiveLogout());
    window.location.href = "/loginsuperadmin";
  };
}
