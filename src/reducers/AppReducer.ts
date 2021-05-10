import ActionTypes, { ActionValues, AppState } from "../actions/ActionTypes";

export const initialState = {
  loading: false,
  uploading: false,
  uploadingProgress: 0,
  downloading: false,
  downloadingProgress: 0,
  auth: null,
  test: "",
};

export const reducer = (state: AppState, action: ActionValues): AppState => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ActionTypes.SET_UPLOADING:
      return {
        ...state,
        uploading: (<AppState>action.payload).uploading,
        loadingProgress: (<AppState>action.payload).loadingProgress,
      };
    case ActionTypes.SET_AUTH:
      console.log({ ...state, auth: action.payload });
      return { ...state, auth: action.payload };
    case ActionTypes.SET_TEST: {
      return { ...state, test: <string>action.payload };
    }
    default:
      throw new Error();
  }
};
export default reducer;
