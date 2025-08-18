import axios from "axios";
import qs from "qs";

const customAxios = axios.create({
  withCredentials: true,
  baseURL: "https://api.skybrg.io",
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

export default customAxios;
