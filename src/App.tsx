import React, { useReducer } from "react";
import AppRoutes from "./AppRoutes";
import "./assets/scss/main.scss";
import { ActionValues } from "./reducers/ActionTypes";
import * as AppReducer from "./reducers/AppReducer";

interface AppContextProps {
  state: AppReducer.AppState;
  dispatch: React.Dispatch<ActionValues>;
}
export const AppContext = React.createContext({} as AppContextProps);

const App = (): React.ReactElement => {
  const [state, dispatch] = useReducer(
    AppReducer.reducer,
    AppReducer.initialState
  );
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <AppRoutes />
      </div>
    </AppContext.Provider>
  );
};

export default App;
