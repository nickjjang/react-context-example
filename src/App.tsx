/* eslint-disable @typescript-eslint/ban-types */
import { createBrowserHistory } from "history";
import React, { useReducer } from "react";
import AppContext from "./AppContext";
import AppRoutes from "./AppRoutes";
import "./assets/scss/main.scss";

import AppReducer, { initialState } from "./reducers/AppReducer";

export const history = createBrowserHistory();
const App = (): React.ReactElement => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <AppRoutes />
      </div>
    </AppContext.Provider>
  );
};

export default App;
