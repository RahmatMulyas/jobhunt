import axios from "axios";
import { Cookies } from "react-cookie";

const axiosClient = axios.create({
  // all axios can be used, shown in axios documentation
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((axiosConfig) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token) axiosConfig.headers.Authorization = `${token}`;

  return axiosConfig;
});

export default axiosClient;
