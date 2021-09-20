import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from 'containers/LoginPage';
import TreeGames from 'containers/TreeGamePage';
import WriteExpressionGame from 'containers/WriteExpressionGame';
import NotFoundPage from 'containers/NotFoundPage';
import SignupPage from 'containers/SignupPage';
import OnBoardingPage from 'containers/OnBoardingPage';
import RPG from 'containers/ReadPracticeGradeContainer';

import TopicContainer from 'containers/TopicContainer';
import ConceptsContainer from 'containers/ConceptsContainer';
import LevelScreen from 'containers/LevelScreen';
import QuesType1 from 'containers/QuesType1';
//
//

import { AuthContext } from 'contexts';

function Routes(props) {
  const context = useContext(AuthContext);

  const authToken = context[0];
  const { isLoggedIn } = context[1];
  const userData = context[1].credentials;
  console.log(authToken, isLoggedIn, userData);

  if (!authToken || !isLoggedIn) {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={LoginPage} />
        <Route exact path="/onboard/:token" component={LoginPage} />
        <Route exact path="/verify-email" component={LoginPage} />
        <Route exact path="/forgot-password" component={LoginPage} />
        <Route exact path="/treegame/:level" component={TreeGames} />
        <Route
          exact
          path="/write-expression/:level"
          component={WriteExpressionGame}
        />
        <Route exact path="/*" render={() => <Redirect to="/login" />} />
      </Switch>
    );
  }
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

      <Route exact path="/topic1/concepts/1/RPG" component={RPG} />
    </Switch>
  );
}

export default Routes;
