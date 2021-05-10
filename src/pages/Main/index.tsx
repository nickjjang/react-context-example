import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { GuardedRoute, GuardProvider } from "react-router-guards";
import AppContext from "../../AppContext";
import * as Guards from "../../Guards";
import MainLayout from "../../layouts/MainLayout";
import Page404 from "../Errors/Page404";
import CollectorToReader from "./CollectorToReader";
import Intro from "./Intro";
import Patients from "./Patients";
import PatientToCollector from "./PatientToCollector";
import RegisterPatient from "./RegisterPatient";
import TestRecordDetail from "./TestRecordDetail";
import TestRecords from "./TestRecords";

const App = (): React.ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <MainLayout>
      <Switch>
        <GuardProvider guards={[Guards.requireLogin]}>
          <GuardedRoute exact path="/" component={Intro} meta={state} />
          <GuardedRoute
            exact
            path="/patients"
            component={Patients}
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
            path="/test-records/:id"
            component={TestRecordDetail}
            meta={state}
          />
          <GuardedRoute
            exact
            path="/test-records"
            component={TestRecords}
            meta={state}
          />
        </GuardProvider>

        <Route path="*" component={Page404} />
      </Switch>
    </MainLayout>
  );
};

export default App;
