import MemberType from 'components/common/memberType/MemberType';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { styled } from 'styled-components';

import InputBox from 'components/common/inputBox/InputBox';
import { useMutation } from 'react-query';

import { LoginDataForm } from 'model/market';
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
      console.log(data);
      navigate('/');
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const postData: LoginDataForm = {
      username: loginState.id,
      password: loginState.password,
      login_type: loginState.type,
    };
    loginMutation.mutate(postData);
  };
  return (
    <WrapperDiv>
      {/* Logo Image */}
      <img src="/assets/Logo-hodu.png" alt="Logo" />
      <LoginContainerDiv>
        {/* Member Type Tabs */}
        <MemberType
          buyerBtnText="구매회원 로그인"
          sellerBtnText="판매회원 로그인"
          handleTypeChange={handleTypeChange}
        />

        {/* Login Form */}
        <LoginForm onSubmit={onSubmit}>
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
        </LoginForm>

        {/* Links to Registration and Password Recovery */}
        <JoinGroupDiv>
          <a href="/join">회원가입</a>
          <a href="/find-password">비밀번호 찾기</a>
        </JoinGroupDiv>
      </LoginContainerDiv>
    </WrapperDiv>
  );
};

export default Login;

const WrapperDiv = styled.div`
  max-width: 500px;
  margin: 180px auto;
  img {
    display: block;
    width: 250px;
    margin: 0 auto 70px auto;
  }
`;

const LoginContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-memberType-box {
    display: flex;
  }
`;

const LoginForm = styled.form`
  width: 550px;
  padding: 30px;
  padding-bottom: 0;
  border: 1px solid #c4c4c4;
  border-top: 0;

  input:not(:last-of-type) {
    margin-bottom: 40px;
  }
  .login-btn {
    margin: 36px 0;
    background-color: var(--main-color);
    color: white;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    border-radius: 5px;
    padding: 19px 215px;
  }
`;
const JoinGroupDiv = styled.div`
  color: #333333;
  margin-top: 30px;
  a:first-child::after {
    content: '';
    border-right: 1px solid #333333;
    margin: 0 14px;
  }
`;
