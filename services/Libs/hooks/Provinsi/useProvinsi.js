import axiosClient from "../../axios";

export const getProvinsi = async (path) => {
  const url = `/${path}`;
  try {
    const response = await axiosClient.get(url);
    return response;
  } catch (error) {
    // console.log("ERROR", error);
  }
};
