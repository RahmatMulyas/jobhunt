import { Cookies } from "react-cookie";
import axiosClient from "../Libs/axios";

export const cleanObject = (obj) => {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

export const fetcher = (url) => {
  const cookies = new Cookies();
  return axiosClient
    .get(url)
    .then((res) => res.data?.data)
    .catch((err) => {
      const {
        response: { status },
      } = err;
      if (status === 401) {
        const allCookies = cookies.getAll();
        Object.keys(allCookies).forEach((cookie) => {
          cookies.remove(cookie, { path: "/" });
        });
        window.location.href = "/";
      }
    });
};

export const fetcherMeta = (url) => {
  const cookies = new Cookies();
  return axiosClient
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      const {
        response: { status },
      } = err;
      if (status === 401) {
        const allCookies = cookies.getAll();
        Object.keys(allCookies).forEach((cookie) => {
          cookies.remove(cookie, { path: "/" });
        });
        window.location.href = "/";
      }
    });
};

export const fetcherMetaSuperadmin = (url) => {
  const cookies = new Cookies();
  return axiosClient
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      const {
        response: { status },
      } = err;
      if (status === 401) {
        const allCookies = cookies.getAll();
        Object.keys(allCookies).forEach((cookie) => {
          cookies.remove(cookie, { path: "/" });
        });
        window.location.href = "/loginsuperadmin";
      }
    });
};
