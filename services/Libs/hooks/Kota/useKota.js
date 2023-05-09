import axios from "axios";

export const getKota = async (id) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/data_kota?provinsi=${id}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {}
};
