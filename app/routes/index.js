import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from 'containers/LoginPage';
import TreeGames from 'containers/TreeGamePage';
import NotFoundPage from 'containers/NotFoundPage';
import SignupPage from 'containers/SignupPage';
import OnBoardingPage from 'containers/OnBoardingPage';

import TopicContainer from 'containers/TopicContainer';
import ConceptsContainer from 'containers/ConceptsContainer';
import LevelScreen from 'containers/LevelScreen';
import QuesType1 from 'containers/QuesType1';
//
//

function Routes(props) {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={LoginPage} />
      <Route exact path="/onboard/:token" component={LoginPage} />
      <Route exact path="/verify-email" component={LoginPage} />
      <Route exact path="/forgot-password" component={LoginPage} />
      <Route exact path="/treegame/:level" component={TreeGames} />
      <Route exact path="/topics" component={TopicContainer} />

      <Route exact path="/topic1/concepts" component={ConceptsContainer} />

      <Route exact path="/topic1/concepts/1" component={LevelScreen} />

      <Route exact path="/topic1/concepts/1/1" component={QuesType1} />
    </Switch>
  );
}

export default Routes;
