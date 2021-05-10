import axios from "axios";
import Qs from "qs";
import { AppContextValues } from "../AppContext";

const AppApi = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    "X-TENANT-DOMAIN": process.env.REACT_APP_API_HEADER_X_TENANT_DOMAIN,
    "X-API-VERSION": process.env.REACT_APP_API_HEADER_X_API_VERSION,
    "X-APP-TYPE": process.env.REACT_APP_API_HEADER_X_APP_TYPE,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  paramsSerializer: (params) => {
    return Qs.stringify(params, { arrayFormat: "brackets" });
  },
});

AppApi.interceptors.request.use((config) => {
  if (AppContextValues.state && AppContextValues.state.auth) {
    console.log(AppContextValues.state.auth.token);
    config.headers["Authorization"] = AppContextValues.state.auth.token;
  }
  if (config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
    if (config.data instanceof Object) {
      config.data = Qs.stringify(config.data);
    }
  }
  return config;
});

export default AppApi;
