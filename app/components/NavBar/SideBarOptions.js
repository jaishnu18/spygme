/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import Icons from 'components/IconBox';

const OptionWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-top: 15px;
  .option-label {
    color: rgb(35 43 43);
    font-size: 16px;
    font-weight: ${props => (props.active ? '600' : '400')} !important;
  }
`;

function SideBarOption(props) {
  return (
    <OptionWrapper active={props.active}>
      {props.Option.url ? (
        <Link
          to={props.Option.url}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '15px',
          }}
        >
          <Icons marginright="10px" src={props.Option.icon} />
          <div className="option-label">{props.Option.label}</div>
        </Link>
      ) : (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '15px',
          }}
          onClick={props.toggleLogout}
        >
          <Icons marginright="10px" src={props.Option.icon} />
          <div className="option-label">{props.Option.label}</div>
        </div>
      )}
    </OptionWrapper>
  );
}

SideBarOption.propTypes = {
  Option: PropTypes.object,
  toggleLogout: PropTypes.func,
};

export default memo(SideBarOption);
