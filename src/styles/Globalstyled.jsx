import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyled = createGlobalStyle`
  @font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

  ${reset}
  :root {
    --main-color : #21bf48;
    --main-disabled-color: #767676;
    --main-text-color : #333333; 
    --sub-text-color : #C4C4C4;
  }

  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  ul, ol, li {
        list-style: none;
  }
  a {
      color: inherit;
      text-decoration: none;
  }
  img {
    width: 100%;
    height: 100%;
  }

  body{
    font-family: 'SUITE-Regular';
    font-weight: 400;
  }

  button{
    background: inherit;
    padding: 0;
    border:none;
    box-shadow:none;
    overflow:visible;
    cursor:pointer
  }

  .a11y-hidden {
    position: relative;
    z-index: -1px;
    display: inline-block;
    overflow: hidden;
    width: 1px;
    height: 1px;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    word-break: initial;
    word-wrap: initial;
  }
  .ellipsis {
    overflow: hidden; /* 넘치는 부분 가리기 */
    text-overflow: ellipsis; /* ... 처리하기 */
    white-space: nowrap; /* 줄바꿈 안하기 (한 줄 밑줄임표 적용) */
    display: inline-block; /* 특정 너비를 가지도록 상황에 따라 block or inline-block 으로 변경 */
    width: 200px; /* inline-block처럼 콘텐츠에 따라 유동적인 너비를 가진다면 직접 너비를 설정 */
}
`;

export default GlobalStyled;
