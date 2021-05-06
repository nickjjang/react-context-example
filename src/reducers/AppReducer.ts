import ActionTypes, { ActionValues } from "./ActionTypes";

export interface AppState {
  loading: boolean;
  auth?: any;
  test: string;
}

export const initialState = {
  loading: false,
  auth: null,
  test: "",
};

export const reducer = (state: AppState, action: ActionValues): AppState => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: !!action.payload };
    case ActionTypes.SET_AUTH:
      console.log({ ...state, auth: action.payload });
      return { ...state, auth: action.payload };
    case ActionTypes.SET_TEST: {
      return { ...state, test: action.payload };
    }
    default:
      throw new Error();
  }
};
export default reducer;
