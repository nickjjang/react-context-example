import React from "react";
import { ActionValues, AppState } from "./actions/ActionTypes";
export const AppContextValues = {} as AppContextProps;
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<ActionValues>;
}
const AppContext = React.createContext({} as AppContextProps);
export default AppContext;
