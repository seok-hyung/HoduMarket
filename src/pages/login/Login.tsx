import MemberType from 'components/common/memberType/MemberType';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import * as S from './Login.style';
import InputBox from 'components/common/inputBox/InputBox';

const Login = () => {
  const [loginState, setLoginState] = useState({
    id: '',
    password: '',
    type: 'BUYER',
  });
  const handleTypeChange = (type: 'BUYER' | 'SELLER') => {
    setLoginState((prevState) => ({ ...prevState, type }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginState);
    // 서버로 로그인 요청을 전송하거나 다른 처리를 여기서 수행하면 됩니다.
  };
  return (
    <S.WrapperDiv>
      {/* Logo Image */}
      <img src="/assets/Logo-hodu.png" alt="Logo" />
      <S.LoginContainerDiv>
        {/* Member Type Tabs */}
        <MemberType
          buyerBtnText="구매회원 로그인"
          sellerBtnText="판매회원 로그인"
          handleTypeChange={handleTypeChange}
        />

        {/* Login Form */}
        <S.LoginForm onSubmit={handleSubmit}>
          <InputBox
            label="아이디"
            id="id"
            name="id"
            type="text"
            value={loginState.id}
            onChange={handleInputChange}
            required={true}
          />
          <InputBox
            label="비밀번호"
            name="password"
            id="password"
            type="password"
            value={loginState.password}
            onChange={handleInputChange}
            required={true}
          />

          {/* Submit Button */}
          <button className="login-btn">로그인</button>
        </S.LoginForm>

        {/* Links to Registration and Password Recovery */}
        <S.JoinGroupDiv>
          <a href="/join">회원가입</a>
          <a href="/find-password">비밀번호 찾기</a>
        </S.JoinGroupDiv>
      </S.LoginContainerDiv>
    </S.WrapperDiv>
  );
};

export default Login;
