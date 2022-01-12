import { createGlobalStyle } from 'styled-components';
/* antd css import */
import 'antd/dist/antd.css';
import regularFont from 'fonts/raleway/Raleway-Regular.ttf';
import mediumFont from 'fonts/raleway/Raleway-Medium.ttf';
import demiFont from 'fonts/raleway/Raleway-Black.ttf';
import boldFont from 'fonts/raleway/Raleway-Bold.ttf';

const GlobalStyle = createGlobalStyle`

  :root {
    --appWrapperColor: #ECEEF4;
    --darkTextColor: rgb(0, 47, 45);
    --desktopBgColor: rgba(250,252,255,255);
  }

  @font-face
  {
    font-family: 'Raleway';
    src: local('Raleway'), url(${regularFont}) format('truetype');
    font-weight: 400;
    font-style: regular;
  }

  @font-face
  {
    font-family: 'Raleway';
    src: local('Raleway'), url(${mediumFont}) format('truetype');
    font-weight: 500;
    font-style: medium;
  }

  @font-face
  {
    font-family: 'Raleway';
    src: local('Raleway'), url(${demiFont}) format('truetype');
    font-weight: 600;
    font-style: demi;
  }

  @font-face
  {
    font-family: 'Raleway';
    src: local('Raleway'), url(${boldFont}) format('truetype');
    font-weight: 700;
    font-style: bold;
  }
  
  html,
  body {
    font-family: 'Raleway';
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }


  body.fontLoaded {
    font-family: 'Raleway';
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label,h1 {
    font-family: 'Raleway';
    line-height: 1.5em;
  }

  canvas {
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
`;

export default GlobalStyle;
