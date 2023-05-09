import swal from "sweetalert2";
import Router from "next/router";
import { logoutUser } from "@services/redux/actions/LoginAction";

export function errorReturn(error, dispatch) {
  if (error.response) {
    if (error.response.status === 401) {
      dispatch(logoutUser(dispatch));
    } else if (error.response.status >= 500) {
      return swal.fire("Gagal!", "Kegagalan pada server", "error");
    } else {
      swal.fire("Gagal!", error.response.data.stat_msg, "error");
      throw error.response;
    }
  }
  return null;
}

export function errorReturnKlinik(error, dispatch) {
  if (error.response) {
    if (error.response.status === 401) {
      dispatch(logoutUserKlinik(dispatch));
    } else if (error.response.status >= 500) {
      return swal.fire("Gagal!", "Kegagalan pada server", "error");
    } else {
      swal.fire("Gagal!", error.response.data.stat_msg, "error");
      throw error.response;
    }
  }
  return null;
}

export function successReturn(response, message, link) {
  swal.fire("Sukses!", message, "success").then(() => Router.push(link));
  return response.data;
}

export function successToastReturn(response, message) {
  const Toast = swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", swal.stopTimer);
      toast.addEventListener("mouseleave", swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
  return response.data;
}
