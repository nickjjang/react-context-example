import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import './assets/scss/main.scss';
import Login from './pages/Login';

const history = createBrowserHistory();

function App() {
  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
