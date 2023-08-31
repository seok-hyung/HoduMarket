import { ErrorMsgPProps } from 'model/market';
import styled from 'styled-components';

export const BoxLabel = styled.label`
  min-width: fit-content;
  display: block;
  color: var(--sub-text-color);
  font-size: 18px;
  font-weight: 500;
  line-height: 16px;
  margin-bottom: 15px;
`;

export const BoxInput = styled.input`
  width: 100%;
  color: var(--main-text-color);
  font-weight: 400;
  font-size: 18px;
  line-height: 14px;
  outline: none;
  border: 1px solid var(--sub-text-color);
  border-radius: 5px;
  padding: 15px;

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
