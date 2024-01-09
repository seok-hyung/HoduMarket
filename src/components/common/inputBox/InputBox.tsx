import React from 'react';
import { ErrorMsgPProps } from 'model/market';
import styled from 'styled-components';
import { UseFormRegisterReturn } from 'react-hook-form';
/* InputBox 사용 명세
label : label로 쓰일 텍스트입니다.
id : input의 id값입니다.
type : input의 type입니다.
name :  폼 데이터를 서버에 제출할 때 사용되는 이름을 지정합니다.
value : 입력 필드의 초기 값을 지정합니다.
placeholder : placeholder로 쓰일 텍스트입니다.
min : input의 최소 길이입니다.
max : input의 최대 길이입니다.
onChange : input의 value가 변경된 후 포커스가 해제될 때의 이벤트를 입력해 주세요.
onBlur : input에서 포커스가 해제될 때의 이벤트를 입력해 주세요.
onInput : input의 value가 변경될 때의 이벤트를 입력해 주세요.

<유효성 검사 관련>
errorMessage : 유효성 검사 결과 메시지를 입력합니다.
show : 'on'를 입력하면 message가 나타납니다. 미입력시 message가 있어도 나타나지 않습니다.
*/
const InputBox = ({
  label,
  id,
  name,
  type,
  value,
  placeholder,
  min,
  max,
  show = 'off',
  errorMessage,
  onChange,
  onBlur,
  onInput,
  required,
  register,
}: InputBoxProps) => {
  return (
    <>
      <BoxLabel htmlFor={id}>{label}</BoxLabel>
      <BoxInput
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        minLength={min}
        maxLength={max}
        onInput={onInput}
        value={value}
        required={required}
      />
      <ErrorMsgP show={show}>{errorMessage}</ErrorMsgP>
    </>
  );
};

export default InputBox;

const BoxLabel = styled.label`
  min-width: fit-content;
  display: block;
  color: var(--sub-text-color);
  font-size: 18px;
  font-weight: 500;
  line-height: 16px;
  margin-bottom: 15px;
`;
const BoxInput = styled.input`
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
const ErrorMsgP = styled.p<ErrorMsgPProps>`
  font-size: 12px;
  color: #eb5757;
  font-weight: 500;
  line-height: 14px;
  margin: 10px 0;
  display: ${(props) => (props.show === 'on' ? 'block' : 'none')};
`;

type InputBoxProps = {
  label?: string;
  id: string;
  name?: string;
  type: string;
  placeholder?: string;
  value: string | number;
  min?: number;
  max?: number;
  borderBottomColor?: string;
  show?: 'on' | 'off';
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  register?: (name: string) => UseFormRegisterReturn | undefined;
};
