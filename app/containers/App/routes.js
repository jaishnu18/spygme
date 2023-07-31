import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// import WriteExpressionGame from 'containers/WriteExpressionGame';
import NotFoundPage from 'containers/NotFoundPage';
import DashboardPage from 'containers/DashboardPage';
// // import OnBoardingPage from 'containers/OnBoardingPage';
// import ConceptDescriptionPage from 'containers/ConceptDescriptionPage';
import MyProfilePage from 'containers/MyProfilePage';

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
import FindCrosswordNodes from 'containers/GAMES/CSP/FindCrosswordNodes';
import GradedFindCrosswordNodes from 'containers/GAMES/CSP/GradedFindCrosswordNodes';
import MatchExpressionGame from 'containers/GAMES/PropositionalLogic/MatchExpressionGame';
import WriteExpressionGame from 'containers/GAMES/PropositionalLogic/WriteExpressionGame';
import TopicListPage from 'containers/TopicListPage';
import ConceptListPage from 'containers/ConceptListPage';
import ReadingMaterialPage from 'containers/ReadingMaterialPage';
import ConceptMaterialPage from 'containers/ConceptMaterialPage';
import GradedExpressionEvaluationGame from 'containers/GAMES/PropositionalLogic/GradedExpressionEvaluationGame';
import GradedMatchExpressionGame from 'containers/GAMES/PropositionalLogic/GradedMatchExpressionGame';
import GradedNodeConsistency from 'containers/GAMES/CSP/GradedNodeConsistency';
import GradedArcConsistency from 'containers/GAMES/CSP/GradedArcConsistency';
import AboutPage from 'containers/AboutPage';
import TestNotAllowedPage from 'containers/TestNotAllowedPage';
import ForgotPasswordPage from 'containers/ForgotPasswordPage';
import ResetPasswordPage from 'containers/ResetPasswordPage';
import ValidInvalidGame from 'containers/GAMES/GameTrees/ValidInvalidGame';
import ScoreYourPosition from 'containers/GAMES/GameTrees/ScoreYourPosition';
import EntropyCalculation from 'containers/GAMES/DecisionTreeLearning/EntropyCalculation';
import GradedEntropyCalculation from 'containers/GAMES/DecisionTreeLearning/GradedEntropyCalculation';
import DiscussPage from '../DISCUSS/DiscussPage';
import DiscussNewThreadPage from '../DISCUSS/DiscussNewThreadPage';
import DiscussViewThreadPage from '../DISCUSS/DiscussViewThreadPage';
import GradedWriteExpressionGame from '../GAMES/PropositionalLogic/GradedWriteExpressionGame';
import NodeConsistencyGame from '../GAMES/CSP/NodeConsistencyGame';
import DrawCrosswordGraphGame from '../GAMES/CSP/DrawCrosswordGraphGame';
import ArcConsistencyGame from '../GAMES/CSP/ArcConsistencyGame';
import CheckMailPage from '../CheckMailPage';
import EmailVerificationPage from '../EmailVerificationPage';
import GradedDrawCrosswordGraph from '../GAMES/CSP/GradedDrawCrosswordGraph';
import CrosswordBacktrackingTreeGame from '../GAMES/CSP/CrosswordBacktrackingTreeGame';
import RevisitQuestionPage from '../RevisitQuestionPage';
import EvaluateAllNodes from '../GAMES/PropositionalLogic/EvaluateAllNodesGame';
import GradedEvaluateAllNodesGame from '../GAMES/PropositionalLogic/GradedEvaluateAllNodesGame';
import GradedCrosswordBacktrackingGame from '../GAMES/CSP/GradedCrosswordBacktrackingGame';
import StatisticsPage from '../StatisticsPage';
import PlugNPlayPage from '../PLUGNPLAY/PlugNPlayPage';
import TeachersDashboardPage from '../TeachersDashboardPage';

function Routes(props) {
  if (!props.AuthData.isLoggedIn) {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about/us" component={AboutPage} />

        <Route
          path="/auth"
          render={() => (
            <Auth
              signin={props.signin}
              signup={props.signup}
              resetErrorMessages={props.resetErrorMessages}
              AuthState={props.AuthState}
            />
          )}
        />
        <Route
          exact
          path="/check/mail/:domain/:email"
          render={({ match }) => (
            <CheckMailPage
              email={match.params.email}
              domain={match.params.domain}
            />
          )}
        />
        <Route
          path="/verify/:token"
          render={({ match }) => (
            <EmailVerificationPage token={match.params.token} />
          )}
        />
        <Route
          path="/reset-password/:token"
          render={({ match }) => (
            <ResetPasswordPage token={match.params.token} />
          )}
        />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/*" render={() => <Redirect to="auth" />} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />

      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/teachers-dashboard" component={TeachersDashboardPage} />

      <Route exact path="/home" component={prop => <HomePage {...prop} />} />
      <Route exact path="/plug-n-play" component={PlugNPlayPage} />
      <Route exact path="/topics" component={TopicListPage} />
      <Route exact path="/testnotallowed" component={TestNotAllowedPage} />
      <Route exact path="/discuss" component={DiscussPage} />
      <Route
        exact
        path="/discuss/new-thread"
        component={DiscussNewThreadPage}
      />
      <Route
        exact
        path="/discuss/view-thread/:threadId"
        render={({ match }) => (
          <DiscussViewThreadPage threadId={match.params.threadId} />
        )}
      />

      <Route
        exact
        path="/evaluate-expression/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <ExpressionEvaluationGame
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />
      <Route
        exact
        path="/match-expression/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <MatchExpressionGame
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />
      <Route
        exact
        path="/write-expression/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <WriteExpressionGame
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />
      <Route
        exact
        path="/evaluate-all-nodes/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <EvaluateAllNodes
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />

      <Route
        exact
        path="/find-nodes/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <FindCrosswordNodes
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />

      {/* updated by sagar */}
      <Route
        exact
        path="/valid-invalid-game/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <ValidInvalidGame
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />

      <Route
        exact
        path="/score-your-position/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <ScoreYourPosition
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />
      {/* end of sagar's update */}

      <Route
        exact
        path="/revisit/question"
        render={({ match }) => <RevisitQuestionPage />}
      />

      <Route
        exact
        path="/node-consistency/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <NodeConsistencyGame
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />
      <Route
        exact
        path="/arc-consistency/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <ArcConsistencyGame
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />
      <Route
        exact
        path="/crossword-backtracking-tree/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <CrosswordBacktrackingTreeGame
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />
      <Route
        exact
        path="/draw-crossword-graph/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <DrawCrosswordGraphGame
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />

      <Route
        exact
        path="/entropy/:topicId/:conceptId/:gameId/:level"
        render={({ match }) => (
          <EntropyCalculation
            level={match.params.level}
            gameId={match.params.gameId}
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
          />
        )}
      />

      <Route
        exact
        path="/graded-quiz/evaluate-expression/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedExpressionEvaluationGame gameId={match.params.gameId} />
        )}
      />
      <Route
        exact
        path="/graded-quiz/match-expression/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedMatchExpressionGame gameId={match.params.gameId} />
        )}
      />
      <Route
        exact
        path="/graded-quiz/write-expression/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedWriteExpressionGame gameId={match.params.gameId} />
        )}
      />
      <Route
        exact
        path="/graded-quiz/evaluate-all-nodes/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedEvaluateAllNodesGame gameId={match.params.gameId} />
        )}
      />

      <Route
        exact
        path="/graded-quiz/find-nodes/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedFindCrosswordNodes gameId={match.params.gameId} />
        )}
      />
      <Route
        exact
        path="/graded-quiz/draw-crossword-graph/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedDrawCrosswordGraph gameId={match.params.gameId} />
        )}
      />
      <Route
        exact
        path="/graded-quiz/node-consistency/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedNodeConsistency gameId={match.params.gameId} />
        )}
      />
      <Route
        exact
        path="/graded-quiz/arc-consistency/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedArcConsistency gameId={match.params.gameId} />
        )}
      />

      <Route
        exact
        path="/graded-quiz/crossword-backtracking-tree/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedCrosswordBacktrackingGame gameId={match.params.gameId} />
        )}
      />

      <Route
        exact
        path="/graded-quiz/entropy/:topicId/:conceptId/:gameId"
        render={({ match }) => (
          <GradedEntropyCalculation gameId={match.params.gameId} />
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
        path="/reading-material/:topicId/:conceptId/:rmId"
        render={({ match }) => (
          <ReadingMaterialPage
            topicId={match.params.topicId}
            conceptId={match.params.conceptId}
            rmId={match.params.rmId}
          />
        )}
      />
      <Route
        exact
        path="/concept/:topicId/:conceptId"
        render={({ match }) => (
          <ConceptMaterialPage
            conceptId={match.params.conceptId}
            topicId={match.params.topicId}
          />
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

      */}
      <Route exact path="/my/profile" component={MyProfilePage} />
      <Route exact path="/my/stats" component={StatisticsPage} />
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
