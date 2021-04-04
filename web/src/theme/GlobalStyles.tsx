import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: ${props => props.theme.typography.fontFamily};
    font-size: ${props => props.theme.typography.fontSize};
  }

  * {
    padding: 0;
    margin: 0;
    border: 0;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  input,
  button,
  textarea {
    font-family: inherit;
    font-size: inherit;
  }

  button {
    cursor: pointer;
  }
`
