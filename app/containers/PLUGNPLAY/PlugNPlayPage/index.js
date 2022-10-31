/**
 *
 * PlugNPlayPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import api from 'api';
import makeSelectPlugNPlayPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import PlugNPlayMain from '../../../components/PLUGNPLAY/PlugNPlayMain';

export function PlugNPlayPage() {
  useInjectReducer({ key: 'plugNPlayPage', reducer });
  useInjectSaga({ key: 'plugNPlayPage', saga });
  const [gameTitle, setGameTitle] = useState('');
  const [instGenValResult, setInstGenValResult] = useState('');

  async function instanceGeneratorValidate(values) {
    const import_section = `import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';
import { getRepository } from 'typeorm';

import { Games } from 'typeorm/entities/games/gamesData';
import { GradedGamesData } from 'typeorm/entities/gradedGames/gradedGameData';
import { PracticeGamesData } from 'typeorm/entities/practiceGames/practiceGameData';
import { PracticeProgressTable } from 'typeorm/entities/progressTable/practiceProgressTable';
import { Role } from 'typeorm/entities/users/types';
import { User } from 'typeorm/entities/users/User';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtToken } from 'utils/createJwtToken';
import factory from 'utils/GameOutput/output';
import { CustomError } from 'utils/response/custom-error/CustomError';
import updateStreak from 'utils/updateStreak';\n`;

    let code = `\nconst levels = [${values.level_params}];\n\n`;
    code += `export const ${gameTitle.replace(
      ' ',
      '',
    )} = (req: Request, res: Response, next: NextFunction) => {
const { level } = req.params;
let lvl = parseInt(level);
lvl--;
try {
  factory().then(async (instance) => {
    const response = {}\n`;
    code = `${import_section + code + values.main_code}\n`;
    const export_vars = values.export_vars.split(',');
    for (let i = 0; i < export_vars.length; i++) {
      const cur_var = export_vars[i].trim();
      if (cur_var.length === 0) continue;
      code += `    response['${cur_var}'] = ${cur_var};\n`;
    }
    code += `    res.customSuccess(200, 'Instance Generated', response);
  });
} catch (err) {
  const customError = new CustomError(400, 'Raw', 'Failed to Get the Expression.', null, err);
  return next(customError);
}
};
`;
    console.log(code);
    const codeRes = {};
    codeRes.code = code;
    setInstGenValResult('Checking for syntax errors...');
    const R = await api.post('/plug-n-play/compile', codeRes, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('_UFT_'),
      },
      withCredentials: true,
    });
    setInstGenValResult(R.data.data.message);
  }

  const responseValidatorValidate = values => {
    const import_section = `import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';
import { getRepository } from 'typeorm';

import { Games } from 'typeorm/entities/games/gamesData';
import { GradedGamesData } from 'typeorm/entities/gradedGames/gradedGameData';
import { PracticeGamesData } from 'typeorm/entities/practiceGames/practiceGameData';
import { PracticeProgressTable } from 'typeorm/entities/progressTable/practiceProgressTable';
import { Role } from 'typeorm/entities/users/types';
import { User } from 'typeorm/entities/users/User';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtToken } from 'utils/createJwtToken';
import factory from 'utils/GameOutput/output';
import { CustomError } from 'utils/response/custom-error/CustomError';
import updateStreak from 'utils/updateStreak;\n`;

    let code = `export const ${gameTitle.replace(
      ' ',
      '',
    )}Validate = (req: Request, res: Response, next: NextFunction) => {
        const { studentResponse } = req.body;
try {
  factory().then(async (instance) => {
    const response = {}\n`;
    code = `${import_section + code + values.main_code}\n`;
    const export_vars = values.export_vars.split(',');
    for (let i = 0; i < export_vars.length; i++) {
      const cur_var = export_vars[i].trim();
      if (cur_var.length === 0) continue;
      code += `    response['${cur_var}'] = ${cur_var};\n`;
    }
    code += `    res.customSuccess(200, 'Instance Generated', response);
  });
} catch (err) {
  const customError = new CustomError(400, 'Raw', 'Failed to Get the Expression.', null, err);
  return next(customError);
}
};
`;
    console.log(code);
  };

  return (
    <div>
      <Helmet>
        <title>PlugNPlayPage</title>
        <meta name="description" content="Description of PlugNPlayPage" />
      </Helmet>
      <PlugNPlayMain
        instanceGeneratorValidate={instanceGeneratorValidate}
        instGenValResult={instGenValResult}
        responseValidatorValidate={responseValidatorValidate}
        gameTitle={gameTitle}
        setGameTitle={setGameTitle}
      />
    </div>
  );
}

PlugNPlayPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  plugNPlayPage: makeSelectPlugNPlayPage(),
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
)(PlugNPlayPage);
