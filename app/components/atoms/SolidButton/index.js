/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import Button from 'antd/lib/button';
import styled from 'styled-components';

export default styled(Button)`
  background: ${props =>
    props.disabled
      ? '#7a1230'
      : props.colorbg
      ? props.colorbg
      : '#7a1230'} !important;
  border-color: ${props => (props.bordercolor ? props.bordercolor : null)};
  border: ${props => (props.noborder ? 'none' : '1px')} !important;
  padding: ${props => (props.nopadding ? '0' : '4px 15px')} !important;

  width: ${props => (props.width ? props.width : '100%')} !important;
  height: ${props =>
    props.height && !props.fixTopSave ? props.height : '55px'} !important;
  max-width: ${props => (props.maxwidth ? props.maxwidth : '100%')} !important;

  
  font-weight: ${props =>
    props.fontWeight ? props.fontWeight : '400'} !important;
  border-radius: ${props =>
    props.borderradius ? props.borderradius : '500'}px !important;
    
  span{
    margin: 0 !important;
    color: ${props =>
      props.iconcolor ? props.iconcolor : '#ffffff'} !important;
    font-size: ${props =>
      props.iconsize ? props.iconsize : '16'}px !important;

  }
  
  text-align: ${props =>
    props.textAlign ? props.textAlign : 'center'}!important;

  ${({ fixedBottom }) =>
    fixedBottom &&
    `
    position: fixed !important;
    left: 50%;    
    transform: translate(-50%, 0);
    margin-left: auto;
    margin-right: auto;
    bottom: 30px;
    z-index: 99;
  `}


  ${({ noanimation }) =>
    noanimation &&
    `
    :after {
      animation: none !important;
    }
  `}

  ${({ Dashed }) =>
    Dashed &&
    `
    border-style: dashed !important;
  `}



  display:${props => (props.display ? props.display : null)};
  bottom: ${props => (props.FromBottom ? props.FromBottom : null)};
  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : null} !important;
  margin-top: ${props => (props.margintop ? props.margintop : null)} !important;
  margin-left: ${props =>
    props.marginleft ? props.marginleft : null} !important;
  margin-right: ${props =>
    props.marginright ? props.marginright : null} !important;
  
`;
