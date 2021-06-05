import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Signin from '../pages/SignIn';
import TradeUrl from '../pages/TradeUrl';
import Route from './Route';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/tradeurl" component={TradeUrl} isPrivate />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}

export default Routes;
