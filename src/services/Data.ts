import React from "react";
import { ActionValues } from "../actions/ActionTypes";
import { setLoading } from "../actions/AppAction";
import {
  DeviceDataAdvancedOwnerFormModel,
  DeviceDataFormModel,
  DeviceDataModel,
} from "../models";
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

export const deviceDataAdvancedOwner = async (
  dispatch: React.Dispatch<ActionValues>,
  params: DeviceDataAdvancedOwnerFormModel
): Promise<DeviceDataModel> => {
  await dispatch(setLoading(true));
  try {
    const response = await AppApi.post(
      "/data/devicedata-advanced/owner",
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await dispatch(setLoading(false));
    return <DeviceDataModel>(
      (response.data &&
      response.data.content &&
      response.data.content.length > 0
        ? response.data.content[0]
        : null)
    );
  } catch (error) {
    await dispatch(setLoading(false));
    throw error;
  }
};
