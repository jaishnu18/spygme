import { createGlobalStyle } from 'styled-components';
/* antd css import */
import 'antd/dist/antd.css';
import regularFont from 'fonts/circular/circular-book.ttf';
import mediumFont from 'fonts/circular/circular-medium.ttf';
import demiFont from 'fonts/circular/circular-black.ttf';
import boldFont from 'fonts/circular/circular-bold.ttf';

const GlobalStyle = createGlobalStyle`

@font-face
  {
    font-family: 'circular';
    src: local('circular'), url(${regularFont}) format('truetype');
    font-weight: 400;
    font-style: regular;
  }

  @font-face
  {
    font-family: 'circular';
    src: local('circular'), url(${mediumFont}) format('truetype');
    font-weight: 500;
    font-style: medium;
  }

  @font-face
  {
    font-family: 'circular';
    src: local('circular'), url(${demiFont}) format('truetype');
    font-weight: 600;
    font-style: demi;
  }

  @font-face
  {
    font-family: 'circular';
    src: local('circular'), url(${boldFont}) format('truetype');
    font-weight: 700;
    font-style: bold;
  }
  
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
