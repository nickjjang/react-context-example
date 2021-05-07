import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { GuardedRoute, GuardProvider } from "react-router-guards";
import { AppContext } from "../../App";
import * as Guards from "../../Guards";
import MainLayout from "../../layouts/MainLayout";
import Page404 from "../Errors/Page404";
import CollectorToReader from "./CollectorToReader";
import PatientToCollector from "./PatientToCollector";
import Intro from "./Intro";
import RegisterPatient from "./RegisterPatient";
import SearchPatients from "./SearchPatients";
import SearchTestRecords from "./SearchTestRecords";

const App = (): React.ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <MainLayout>
      <Switch>
        <GuardProvider guards={[Guards.requireLogin]}>
          <GuardedRoute exact path="/" component={Intro} meta={state} />
          <GuardedRoute
            exact
            path="/search-patients"
            component={SearchPatients}
            meta={state}
          />
          <GuardedRoute
            exact
            path="/register-patient"
            component={RegisterPatient}
            meta={state}
          />
          <GuardedRoute
            exact
            path="/patient-to-collector/:id"
            component={PatientToCollector}
            meta={state}
          />
          <GuardedRoute
            exact
            path="/collector-to-reader"
            component={CollectorToReader}
            meta={state}
          />
          <GuardedRoute
            exact
            path="/search-test-records"
            component={SearchTestRecords}
            meta={state}
          />
        </GuardProvider>

        <Route path="*" component={Page404} />
      </Switch>
    </MainLayout>
  );
};

export default App;
