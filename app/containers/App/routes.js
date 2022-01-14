import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// import WriteExpressionGame from 'containers/WriteExpressionGame';
import NotFoundPage from 'containers/NotFoundPage';
import DashboardPage from 'containers/DashboardPage';
// // import OnBoardingPage from 'containers/OnBoardingPage';
// import ConceptDescriptionPage from 'containers/ConceptDescriptionPage';
// import MyProfilePage from 'containers/MyProfilePage';

// import TopicsPage from 'containers/TopicsPage';
// import ConceptsContainer from 'containers/ConceptsContainer';
// import LevelScreen from 'containers/LevelScreen';
// import MatchExpressionGame from 'containers/MatchExpressionGame';
// import FindCrosswordNodesGame from 'containers/FindCrosswordNodesGame';
// import NodeConsistency from 'containers/NodeConsistencyGame';
// import ArcConsistencyGame from 'containers/ArcConsistencyGame';
// import DrawCrosswordGraphGame from 'containers/DrawCrosswordGraphGame';
// import GradedMatchExpressionGame from 'containers/GradedMatchExpressionGame';
// import GradedWriteExpressionGame from 'containers/GradedWriteExpressionGame';
// import ReadingMaterialPage from 'containers/ReadingMaterialPage';
import HomePage from 'containers/HomePage';
import Auth from 'containers/Auth';
import ExpressionEvaluationGame from 'containers/GAMES/PropositionalLogic/ExpressionEvaluationGame';
import FindCrosswordNodes from '../GAMES/CSP/FindCrosswordNodes';
import MatchExpressionGame from 'containers/GAMES/PropositionalLogic/MatchExpressionGame';
import WriteExpressionGame from 'containers/GAMES/PropositionalLogic/WriteExpressionGame';
import TopicListPage from 'containers/TopicListPage';
import ConceptListPage from 'containers/ConceptListPage';
import ReadingMaterialPage from 'containers/ReadingMaterialPage';
import ConceptMaterialPage from 'containers/ConceptMaterialPage';
// import GradedNodeConsistencyGame from '../containers/GradedNodeConsistencyGame';
//

function Routes(props) {
  if (!props.AuthData.isLoggedIn) {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route
          path="/auth"
          render={() => (
            <Auth
              signin={props.signin}
              signup={props.signup}
              AuthState={props.AuthState}
            />
          )}
        />
        <Route exact path="/*" render={() => <Redirect to="auth" />} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route path="/dashboard" component={DashboardPage} />
      {/*

      
       */}

      <Route exact path="/home" component={prop => <HomePage {...prop} />} />
      <Route exact path="/topics" component={TopicListPage} />
      <Route
        exact
        path="/evaluate-expression/:gameId/:level"
        render={({ match }) => (
          <ExpressionEvaluationGame
            level={match.params.level}
            gameId={match.params.gameId}
          />
        )}
      />
      <Route
        exact
        path="/match-expression/:gameId/:level"
        render={({ match }) => (
          <MatchExpressionGame
            level={match.params.level}
            gameId={match.params.gameId}
          />
        )}
      />
      <Route
        exact
        path="/write-expression/:gameId/:level"
        render={({ match }) => (
          <WriteExpressionGame
            level={match.params.level}
            gameId={match.params.gameId}
          />
        )}
      />

      <Route
        exact
        path="/find-crossword-nodes/:gameId/:level"
        render={({ match }) => (
          <FindCrosswordNodes
            level={match.params.level}
            gameId={match.params.gameId}
          />
        )}
      />
      <Route
        exact
        path="/topics/:topicId"
        render={({ match }) => (
          <ConceptListPage topicId={match.params.topicId} />
        )}
      />
      <Route
        exact
        path="/reading-material/:conceptId/:rmId"
        render={({ match }) => (
          <ReadingMaterialPage
            conceptId={match.params.conceptId}
            rmId={match.params.rmId} />
        )}
      />
      <Route
        exact
        path="/concept/:topicID/:conceptId"
        render={({ match }) => (
          <ConceptMaterialPage
            conceptId={match.params.conceptId}
            topicID={match.params.topicID} />
        )}
      />

      {/* <Route
        exact
        path="/topics/:topicNo"
        render={({ match }) => (
          <ConceptsContainer topicNo={match.params.topicNo} />
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
        path="/graded-node-consistency/:gameId/:level"
        component={GradedNodeConsistencyGame}
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

      <Route exact path="/my/profile" component={MyProfilePage} /> */}

      <Route exact path="/*" render={() => <NotFoundPage />} />
    </Switch>
  );
}

Routes.propTypes = {
  AuthData: PropTypes.object,
  signin: PropTypes.func,
  signup: PropTypes.func,
  AuthState: PropTypes.object,
};
export default Routes;
