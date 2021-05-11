import axios, { AxiosResponse } from "axios";
import Qs from "qs";
import { AppContextValues } from "../AppContext";
import { toast } from "react-toastify";

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

AppApi.interceptors.response.use(
  (response: AxiosResponse<any>): AxiosResponse<any> => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(JSON.stringify(error));
    switch (error.response.status) {
      case 412:
        toast.error(error.response.data);
        break;
    }
  }
);

export default AppApi;
