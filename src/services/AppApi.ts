/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import Qs from "qs";
import { toast } from "react-toastify";
import { AppContextValues, history } from "../AppContext";
import ENV from "../configs/env";
import AppExceptionMessage from "./AppExceptionMessage";

const AppApi = axios.create({
  baseURL: ENV.API_ENDPOINT,
  headers: {
    "X-TENANT-DOMAIN": ENV.API_HEADER_X_TENANT_DOMAIN,
    "X-API-VERSION": ENV.API_HEADER_X_API_VERSION,
    "X-APP-TYPE": ENV.API_HEADER_X_APP_TYPE,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  paramsSerializer: (params) => {
    return Qs.stringify(params, { arrayFormat: "brackets", encode: true });
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
  console.log(JSON.stringify(config.data));
  return config;
});

AppApi.interceptors.response.use(
  (response: AxiosResponse<any>): AxiosResponse<any> => {
    console.log(response);
    return response;
  },
  (error) => {
    const { response } = error;
    switch (response.status) {
      case 401: {
        toast.error("Unauthorized");
        history.push("/login");
        break;
      }
      case 412:
      case 400:
      case 404:
      default: {
        const errorMessage = new AppExceptionMessage(error.response);
        toast.error(errorMessage.message);
        break;
      }
    }
    throw error;
  }
);

export default AppApi;
