/**
 *
 * CustomInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = styled.div`
  min-width: 100% !important;
  position: relative;
  margin-bottom: ${props => (props.nomargin ? '0' : '15px')};

  .input {
    width: 100% !important;
    padding: 30px 15px 10px 20px;
    border-radius: 500px;
    background-color: rgb(247 251 252);
    border: none;
    outline: none;
    color: rgb(116 116 116);
    font-size: 16px;
    transition: all 0.4s;
  }

  .label {
    position: absolute;
    top: ${props => (props.labeltop ? props.labeltop : '12px')} !important;
    left: 20px;
    color: rgb(159 159 159);
    transition: all 0.4s;
  }

  .input:placeholder-shown {
    padding: 20px 15px 20px 30px;
  }

  .input:placeholder-shown + .label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
  }

  /* .input-icon {
     visibility: visible;
     position: absolute;
     left: 0px;
     top: 0;
     transform: translate(19px, 29px);
   }
 
   .input:placeholder-shown + .input-icon {
     visibility: hidden;
   } */
`;

function CustomInput(props) {
  // const handleChange = event => {
  //   props.onChange(event.target.value);
  // };
  return (
    <InputContainer nomargin={props.nomargin} labeltop={props.labeltop}>
      <input
        disabled={props.disabled}
        placeholder={props.label}
        className="input"
        id={props.inputId}
        onChange={props.handleChange}
        type={props.type ? props.type : 'text'}
        value={props.value}
        required={props.required}
      />
      <label className="label" htmlFor={props.inputId}>
        {props.label}
      </label>
    </InputContainer>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  nomargin: PropTypes.string,
  labeltop: PropTypes.string,
};

export default memo(CustomInput);
