import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import HomeView from '@/views/private/home';
import { PrivateRoute } from './components/private-route';

export const Routes = () => {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <PrivateRoute exact path="/" component={HomeView} />
      </Switch>
    </BrowserRouter>
  );
}
