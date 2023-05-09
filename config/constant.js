import { getToken } from "@helpers/token";

export const token = getToken();

export const COMMON_HEADER = {
  "Content-type": "application/json",
};

export const COMMON_HEADER_TOKEN = {
  "Content-type": "application/json",
  Authorization: `${token}`,
};
