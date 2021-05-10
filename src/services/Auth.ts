import React from "react";
import store from "store2";
import { ActionValues } from "../actions/ActionTypes";
import { setAuth, setLoading } from "../actions/AppAction";
import AppApi from "./AppApi";

export const login = async (
  dispatch: React.Dispatch<ActionValues>,
  params: any
): Promise<any> => {
  await dispatch(setLoading(true));
  const response = await AppApi.post("/auth/login", params);
  console.log(response);
  const auth = {
    token: response.headers["authorization"],
    data: response.data,
  };
  store.set("auth", auth);
  await dispatch(setAuth(auth));
  await dispatch(setLoading(false));
  await dispatch(setLoading(false));
  return response.data;
};

export const remember = async (
  dispatch: React.Dispatch<ActionValues>
): Promise<any> => {
  if (store.has("auth")) {
    await dispatch(setAuth(store.get("auth")));
  }
};

export const logout = async (
  dispatch: React.Dispatch<ActionValues>
): Promise<any> => {
  AppApi.defaults.headers["Authorization"] = "";
  store.remove("auth");
  await dispatch(setAuth(null));
};
