import { ErrorMsgPProps } from 'model/market';
import styled from 'styled-components';

export const BoxLabel = styled.label`
  min-width: fit-content;
  color: var(--sub-text-color);
  font-size: 18px;
  font-weight: 500;
  line-height: 16px;
`;

export const BoxInput = styled.input`
  width: 100%;
  color: var(--main-text-color);
  font-weight: 400;
  font-size: 18px;
  line-height: 14px;
  border: none;
  outline: none;
  border-bottom: 1px solid var(--sub-text-color);
  padding: 10px 0 5px 0;

  &::placeholder {
    color: var(--main-disabled-color);
  }
`;

export const ErrorMsgP = styled.p<ErrorMsgPProps>`
  font-size: 12px;
  color: #eb5757;
  font-weight: 500;
  line-height: 14px;
  margin: 10px 0;
  display: ${(props) => (props.show === 'on' ? 'block' : 'none')};
`;
