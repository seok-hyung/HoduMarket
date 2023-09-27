import MemberType from 'components/common/memberType/MemberType';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import * as S from './Login.style';
import InputBox from 'components/common/inputBox/InputBox';
import { useMutation } from 'react-query';

import { LoginForm } from 'model/market';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userTokenState } from 'atoms/Atoms';
import { loginAPI } from 'api/login/loginAPI';

const Login = () => {
  const navigate = useNavigate();
  const setUserToken = useSetRecoilState(userTokenState);
  const [loginState, setLoginState] = useState({
    id: '',
    password: '',
    type: 'BUYER',
  });
  const handleTypeChange = (type: 'BUYER' | 'SELLER') => {
    setLoginState((prevState) => ({ ...prevState, type }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };
  const loginMutation = useMutation(loginAPI, {
    // data : res(API 호출 결과 데이터),
    // variables : req(postData 객체)
    onSuccess(data, variables, context) {
      setUserToken(data.token);
      navigate('/');
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const postData: LoginForm = {
      username: loginState.id,
      password: loginState.password,
      login_type: loginState.type,
    };
    loginMutation.mutate(postData);
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
        <S.LoginForm onSubmit={onSubmit}>
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
