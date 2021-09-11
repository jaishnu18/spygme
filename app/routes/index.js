import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from 'containers/LoginPage';
import TreeGames from 'containers/TreeGamePage';
import NotFoundPage from 'containers/NotFoundPage';
import SignupPage from 'containers/SignupPage';
import OnBoardingPage from 'containers/OnBoardingPage';

function Routes(props) {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={LoginPage} />
      <Route exact path="/onboard/:token" component={LoginPage} />
      <Route exact path="/treegame/:level" component={TreeGames} />
    </Switch>
  );
}

export default Routes;
