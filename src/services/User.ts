import React from "react";
import { ActionValues } from "../actions/ActionTypes";
import { setLoading } from "../actions/AppAction";
import { PageModel, UserModel } from "../models";
import AppApi from "./AppApi";

export const findAll = async (
  dispatch: React.Dispatch<ActionValues>,
  params: { emailAddress?: string }
): Promise<PageModel> => {
  await dispatch(setLoading(true));
  try {
    params.emailAddress = encodeURIComponent(params.emailAddress as string);
    const response = await AppApi.get("/user/user", {
      params,
    });
    await dispatch(setLoading(false));
    return response.data;
  } catch (error) {
    await dispatch(setLoading(false));
    throw error;
  }
};

export const findOne = async (
  dispatch: React.Dispatch<ActionValues>,
  emailAddress: string
): Promise<UserModel | null> => {
  await dispatch(setLoading(true));
  try {
    const response = await AppApi.get("/user/user", {
      params: { emailAddress },
    });
    await dispatch(setLoading(false));
    const data =
      response.data && response.data.content && response.data.content.length > 0
        ? response.data.content[0]
        : null;
    return data;
  } catch (error) {
    await dispatch(setLoading(false));
    throw error;
  }
};

export const store = async (
  dispatch: React.Dispatch<ActionValues>,
  data: UserModel
): Promise<null> => {
  await dispatch(setLoading(true));
  try {
    console.log(JSON.stringify(data));
    await AppApi.post("/user/user", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await dispatch(setLoading(false));
    return null;
  } catch (error) {
    await dispatch(setLoading(false));
    throw error;
  }
};
