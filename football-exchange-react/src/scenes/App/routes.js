import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import PrivateLayout from '../../layouts/Private'
import Squad from '../Squad'
import Market from '../Market'
const Routes = () => (
  <Switch>
    <PrivateLayout exact path='/squad' component={Squad} />
    <PrivateLayout path='/market' component={Market} />
    <Route path='*' render={() => <Redirect to='/squad' />} />
  </Switch>
)

export default Routes