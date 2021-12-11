import { createGlobalStyle } from "styled-components"

const rand = Math.ceil(Math.random() * 3)

export const GlobalStyle = createGlobalStyle`
 html {
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0 auto;
    padding: 0;
    line-height: 1.47059;
    font-weight: 400;
    font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background: url('/votezone_bg_${rand}.jpeg') top center no-repeat  #ededed;
    font-style: normal;
    padding-bottom: ${Math.random()}px;
  }

  html, body, #__next{
    height: 100%;
  }
`
