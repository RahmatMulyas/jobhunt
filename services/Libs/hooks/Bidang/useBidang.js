import useSWR from "swr";
import { Cookies } from "react-cookie";

import { fetcher } from "../../../util/util";

function useBidang() {
  return useSWR(`/data_bidang`, fetcher);
}

export default useBidang;
