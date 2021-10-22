/**
 *
 * H1
 *
 */
import styled from 'styled-components';

export default styled.h1`
  line-height: ${props => (props.lineheight ? props.lineheight : '26pt')};
  letter-spacing: 0;
  color: ${props => (props.color ? props.color : 'rgb(0 47 45)')};
  font-size: ${props => (props.size ? props.size : '28')}px;
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  text-align: ${props =>
    props.textAlign ? props.textAlign : 'initial'} !important;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  span {
    color: rgb(116 116 116);
    font-size: 15pt;
  }
`;
