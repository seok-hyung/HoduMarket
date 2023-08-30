import React from 'react';
import { InputProps } from 'model/market';
import * as S from './InputBox.style';
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
}: InputProps) => {
  return (
    <>
      <S.BoxLabel htmlFor={id}>{label}</S.BoxLabel>
      <S.BoxInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        minLength={min}
        maxLength={max}
        onChange={onChange}
        onBlur={onBlur}
        onInput={onInput}
        value={value}
        required={required}
      />
      <S.ErrorMsgP show={show}>{errorMessage}</S.ErrorMsgP>
    </>
  );
};

export default InputBox;
