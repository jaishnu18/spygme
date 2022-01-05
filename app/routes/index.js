import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from 'containers/LoginPage';
import TreeGames from 'containers/TreeGamePage';
import WriteExpressionGame from 'containers/WriteExpressionGame';
import NotFoundPage from 'containers/NotFoundPage';
import DashboardPage from 'containers/DashboardPage';
// import OnBoardingPage from 'containers/OnBoardingPage';
import RPG from 'containers/ReadPracticeGradeContainer';
import ConceptDescriptionPage from 'containers/ConceptDescriptionPage';
import MyProfilePage from 'containers/MyProfilePage';

import TopicsPage from 'containers/TopicsPage';
import ConceptsContainer from 'containers/ConceptsContainer';
import LevelScreen from 'containers/LevelScreen';
import MatchExpressionGame from 'containers/MatchExpressionGame';
import FindCrosswordNodesGame from 'containers/FindCrosswordNodesGame';
import NodeConsistency from 'containers/NodeConsistencyGame';
import ArcConsistencyGame from 'containers/ArcConsistencyGame';
import DrawCrosswordGraphGame from 'containers/DrawCrosswordGraphGame';
import GradedMatchExpressionGame from 'containers/GradedMatchExpressionGame';
import GradedWriteExpressionGame from 'containers/GradedWriteExpressionGame';
import ReadingMaterialPage from 'containers/ReadingMaterialPage';
import HomePage from 'containers/HomePage';
//

function Routes(props) {
  if (!props.authData.isLoggedIn) {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route
          path="/auth/*"
          render={() => (
            <LoginPage
              signin={props.signin}
              signup={props.signup}
              AuthState={props.AuthState}
            />
          )}
        />
        <Route exact path="/*" render={() => <Redirect to="auth/login" />} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route path="/dashboard" component={DashboardPage} />

      <Route
        exact
        path="/evaluate-expression/:gameId/:level"
        render={({ match }) => (
          <TreeGames level={match.params.level} gameId={match.params.gameId} />
        )}
      />
      <Route exact path="/topics" component={TopicsPage} />

      <Route exact path="/home" component={prop => <HomePage {...prop} />} />

      <Route
        exact
        path="/topics/:topicNo"
        render={({ match }) => (
          <ConceptsContainer topicNo={match.params.topicNo} />
        )}
      />

      <Route
        exact
        path="/concept/:conceptId"
        render={({ match }) => (
          <ConceptDescriptionPage conceptId={match.params.conceptId} />
        )}
      />

      <Route
        exact
        path="/topic1/concepts/:conceptNo/RPG"
        component={LevelScreen}
      />
      <Route
        exact
        path="/write-expression/:gameId/:level"
        component={WriteExpressionGame}
      />
      <Route
        exactNotFoundPage
        NotFoundPage
        path="/match-expression/:gameId/:level"
        component={MatchExpressionGame}
      />
      <Route
        exact
        path="/graded-match-expression/:gameId/:level"
        component={GradedMatchExpressionGame}
      />

      <Route
        exact
        path="/graded-write-expression/:gameId/:level"
        component={GradedWriteExpressionGame}
      />

      <Route
        exact
        path="/find-nodes/:gameId/:level"
        component={FindCrosswordNodesGame}
      />
      <Route
        exact
        path="/node-consistency/:gameId/:level"
        component={NodeConsistency}
      />
      <Route
        exact
        path="/arc-consistency/:gameId/:level"
        component={ArcConsistencyGame}
      />
      <Route
        exact
        path="/draw-crossword-graph/:gameId/:level"
        component={DrawCrosswordGraphGame}
      />
      <Route exact path="/reading/:rmId" component={ReadingMaterialPage} />

      <Route exact path="/my/profile" component={MyProfilePage} />

      <Route exact path="/*" render={() => <NotFoundPage />} />
    </Switch>
  );
}

Routes.propTypes = {
  authData: PropTypes.object,
  signin: PropTypes.func,
  signup: PropTypes.func,
  AuthState: PropTypes.object,
};
export default Routes;
