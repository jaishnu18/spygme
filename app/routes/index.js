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
import MatchExpressionGame from 'containers/MatchExpressionGame';
import FindCrosswordNodesGame from 'containers/FindCrosswordNodesGame';
import NodeConsistency from 'containers/NodeConsistencyGame';
import ArcConsistencyGame from 'containers/ArcConsistencyGame';
import DrawCrosswordGraphGame from 'containers/DrawCrosswordGraphGame';
import GradedMatchExpressionGame from 'containers/GradedMatchExpressionGame';
//
//

import { AuthContext } from 'contexts';

function Routes(props) {
  const context = useContext(AuthContext);

  const authToken = context[0];
  const { isLoggedIn } = context[1];
  console.log(authToken, isLoggedIn);

  // if (!authToken) {
  //   return (
  //     <Switch>
  //       <Route exact path="/login" component={LoginPage} />
  //       <Route exact path="/signup" component={LoginPage} />
  //       <Route exact path="/onboard/:token" component={LoginPage} />
  //       <Route exact path="/verify-email" component={LoginPage} />
  //       <Route exact path="/forgot-password" component={LoginPage} />
  //       <Route exact path="/*" render={() => <Redirect to="/login" />} />
  //     </Switch>
  //   );
  // }
  return (
    <Switch>
      <Route exact path="/treegame/:level" component={TreeGames} />
      <Route exact path="/topics" component={TopicContainer} />

      <Route exact path="/topic1/concepts" component={ConceptsContainer} />

      <Route exact path="/topic1/concepts/:conceptNo" component={RPG} />

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

      <Route exact path="/*" render={() => <Redirect to="/topics" />} />
    </Switch>
  );
}

export default Routes;
