import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from 'containers/LoginPage';
import TreeGames from 'containers/TreeGamePage';
import WriteExpressionGame from 'containers/WriteExpressionGame';
import NotFoundPage from 'containers/NotFoundPage';
// import OnBoardingPage from 'containers/OnBoardingPage';
import RPG from 'containers/ReadPracticeGradeContainer';

import TopicContainer from 'containers/TopicContainer';
import ConceptsContainer from 'containers/ConceptsContainer';
import LevelScreen from 'containers/LevelScreen';
import MatchExpressionGame from 'containers/MatchExpressionGame';
import FindCrosswordNodesGame from 'containers/FindCrosswordNodesGame';
import NodeConsistency from 'containers/NodeConsistencyGame';
import ArcConsistencyGame from 'containers/ArcConsistencyGame';
import DrawCrosswordGraphGame from 'containers/DrawCrosswordGraphGame';
import GradedMatchExpressionGame from 'containers/GradedMatchExpressionGame';
//

function Routes(props) {
  if (!props.authData.isLoggedIn) {
    return (
      <Switch>
        <Route
          exact
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
      <Route
        path="/treegame/:level"
        render={({ match }) => <TreeGames level={match.params.level} />}
      />
      <Route exact path="/topics" component={TopicContainer} />

      <Route
        exact
        path="/topics/:topicNo"
        render={({ match }) => (
          <ConceptsContainer topicNo={match.params.topicNo} />
        )}
      />

      <Route
        exact
        path="/topics/:topicNo/:conceptNo"
        render={({ match }) => (
          <RPG
            conceptNo={match.params.conceptNo}
            topicNo={match.params.topicNo}
          />
        )}
      />

      <Route
        exact
        path="/topic1/concepts/:conceptNo/RPG"
        component={LevelScreen}
      />
      <Route
        exact
        path="/write-expression/:level"
        component={WriteExpressionGame}
      />
      <Route
        exact
        path="/match-expression/:level"
        component={MatchExpressionGame}
      />
      <Route
        exact
        path="/match-expression/graded-quiz/id"
        component={GradedMatchExpressionGame}
      />

      <Route
        exact
        path="/find-nodes/:level"
        component={FindCrosswordNodesGame}
      />
      <Route
        exact
        path="/node-consistency/:level"
        component={NodeConsistency}
      />
      <Route
        exact
        path="/arc-consistency/:level"
        component={ArcConsistencyGame}
      />
      <Route
        exact
        path="/draw-crossword-graph/:level"
        component={DrawCrosswordGraphGame}
      />

      <Route exact path="/*" render={() => <NotFoundPage />} />
    </Switch>
  );
}

Routes.propTypes = {
  authData: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  AuthState: PropTypes.object.isRequired,
};
export default Routes;
