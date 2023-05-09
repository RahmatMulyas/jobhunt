import { Cookies } from "react-cookie";
import jwtAuthentication from "./jwtAuthentication";

const cookies = new Cookies();

const setToken = (idToken) => {
  cookies.set("token", idToken, { path: "/" });
};

const getToken = () => cookies.get("token");

const removeToken = () => {
  cookies.remove("token", { path: "/" });
};

const isAuth = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  const localToken = JwtAuthentication.checkExpirity(token);
  return !!token && !!localToken.token; // handwaiving here
};

export { setToken, getToken, removeToken, isAuth };
