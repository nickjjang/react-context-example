/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AppState {
  downloading?: boolean;
  downloadingProgress?: number;
  uploading?: boolean;
  uploadingProgress?: number;
  loading?: boolean;
  loadingProgress?: number;
  auth?: any;
  test?: string;
}

export interface ActionValues {
  type: string;
  payload: number | string | boolean | AppState | any | null;
}

export default {
  SET_UPLOADING: "SET_UPLOADING",
  SET_LOADING: "SET_LOADING",
  SET_AUTH: "SET_AUTH",
  SET_TEST: "SET_TEST",
};
