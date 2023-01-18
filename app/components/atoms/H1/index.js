/**
 * H1 Component
 */
import styled from 'styled-components';
export default styled.h1`
  line-height: ${props => (props.lineheight ? props.lineheight : '26pt')};
  letter-spacing: 0;
  color: ${props => (props.color ? props.color : 'var(--primaryColor)')};
  font-size: ${props => (props.fontSize ? props.fontSize : '28')}px;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'auto')};
  margin-top: ${props => (props.margintop ? props.margintop : '0')}px;
  margin-bottom: ${props => (props.marginbottom ? props.marginbottom : '0')}px;
  margin-left: ${props => (props.marginleft ? props.marginleft : '0')}px;
  text-align: ${props =>
    props.textAlign ? props.textAlign : 'initial'} !important;
  margin-right: ${props => (props.marginright ? props.marginright : '0')}px;
  margin: ${props => (props.margin ? props.margin : '0')}px;
  text-shadow: ${props => (props.textShadow ? props.textShadow : 'none')};
  span {
    color: rgb(116 116 116);
    font-size: 15pt;
  }
`;
