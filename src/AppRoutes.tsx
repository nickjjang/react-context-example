import { createBrowserHistory } from "history";
import React, { useContext } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { GuardedRoute, GuardProvider } from "react-router-guards";
import { AppContext } from "./App";
import * as Guards from "./Guards";
import Login from "./pages/Login";
import Main from "./pages/Main";

const history = createBrowserHistory();
const AppRoutes = (): React.ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <GuardProvider guards={[Guards.requireLogin]}>
          <GuardedRoute path="/" component={Main} meta={state} />
        </GuardProvider>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
