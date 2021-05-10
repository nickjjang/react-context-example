import React from "react";
import { ActionValues } from "../actions/ActionTypes";
import { setLoading } from "../actions/AppAction";
import { DeviceDataFormModel } from "../models";
import AppApi from "./AppApi";

export const deviceData = async (
  dispatch: React.Dispatch<ActionValues>,
  params: DeviceDataFormModel
): Promise<null> => {
  await dispatch(setLoading(true));
  try {
    await AppApi.post("/data/devicedata", params, {
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
