import axiosClient from "../../axios";
export const getKecamatan = async (id) => {
  const url = `/data_kecamatan?kota=${id}`;

  try {
    const response = await axiosClient.get(url);
    return response;
  } catch (error) {}
};
