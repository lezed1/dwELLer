import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LogPage from './containers/LogPage';

export default () => (
  <App>
    <Switch>
      <Route path="/log" component={LogPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
