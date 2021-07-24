/** @jsx jsx */
import { Global, css, jsx } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html {
        font-size: 16px;
      }
      html,
      body,
      button,
      textarea,
      input {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }
      #root {
        max-width: 1000px;
        margin: 0 auto;
      }
    `}
  />
);

export default GlobalStyles;
