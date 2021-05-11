import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GuardedRoute, GuardProvider } from "react-router-guards";
import { ToastContainer } from "react-toastify";
import AppContext, { AppContextValues } from "./AppContext";
import LoadingTent from "./components/LoadingTent";
import * as Guards from "./Guards";
import Login from "./pages/Login";
import Main from "./pages/Main";
import * as Auth from "./services/Auth";

const AppRoutes = (): React.ReactElement => {
  const { state } = useContext(AppContext);
  const [remembered, setRemembered] = useState(false);
  const { dispatch } = useContext(AppContext);
  AppContextValues.dispatch = dispatch;
  AppContextValues.state = state;
  useEffect(() => {
    Auth.remember(dispatch).then(() => {
      setRemembered(true);
    });
  }, []);

  return remembered ? (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <GuardProvider guards={[Guards.requireLogin]}>
            <GuardedRoute path="/" component={Main} meta={state} />
          </GuardProvider>
        </Switch>
      </BrowserRouter>
      <LoadingTent />
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  ) : (
    <></>
  );
};

export default AppRoutes;
