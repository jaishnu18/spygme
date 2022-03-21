/**
 *
 * RevisitQuestionPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import NodeConsistencyGame from '../GAMES/CSP/NodeConsistencyGame';
import DrawCrosswordGraphGame from '../GAMES/CSP/DrawCrosswordGraphGame';
import ArcConsistencyGame from '../GAMES/CSP/ArcConsistencyGame';
import CrosswordBacktrackingTreeGame from '../GAMES/CSP/CrosswordBacktrackingTreeGame';
import FindCrosswordNodes from 'containers/GAMES/CSP/FindCrosswordNodes';
import MatchExpressionGame from 'containers/GAMES/PropositionalLogic/MatchExpressionGame';
import WriteExpressionGame from 'containers/GAMES/PropositionalLogic/WriteExpressionGame';
import ExpressionEvaluationGame from 'containers/GAMES/PropositionalLogic/ExpressionEvaluationGame';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRevisitQuestionPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function RevisitQuestionPage() {
  useInjectReducer({ key: 'revisitQuestionPage', reducer });
  useInjectSaga({ key: 'revisitQuestionPage', saga });

  const [files, setFiles] = useState('');

  const gameDisplay = parsedFile => {
    switch (parseInt(parsedFile.gameId)) {
      case 1:
        return (
          <FindCrosswordNodes
            visitedGameData={parsedFile}
            level={parseInt(parsedFile.level)}
          />
        );
      case 2:
        return <DrawCrosswordGraphGame visitedGameData={parsedFile} />;
      case 3:
        return;
      case 4:
        return;
    }
  };

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      setFiles(e.target.result);
    };
  };

  return (
    <div>
      <Helmet>
        <title>RevisitQuestionPage</title>
        <meta name="description" content="Description of RevisitQuestionPage" />
      </Helmet>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>Upload JSON file</h1>
        <input type="file" onChange={handleChange} />
        {files && gameDisplay(JSON.parse(files))}
      </div>
    </div>
  );
}

RevisitQuestionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  revisitQuestionPage: makeSelectRevisitQuestionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RevisitQuestionPage);
