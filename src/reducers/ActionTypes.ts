/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  SET_LOADING: "SET_LOADING",
  SET_AUTH: "SET_AUTH",
  SET_TEST: "SET_TEST",
};

export interface ActionValues {
  type: string;
  payload: any;
}
