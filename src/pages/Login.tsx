import React, { ChangeEvent, FormEvent, useState } from 'react';
import { styled } from 'styled-components';
import InputBox from 'components/common/inputBox/InputBox';
import MemberType from 'components/common/memberType/MemberType';

import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userTokenState, userTypeState } from 'atoms/Atoms';
import { LoginDataForm } from 'model/market';

import { loginAPI } from 'api/login/loginAPI';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
    trigger,
  } = useForm();
  const navigate = useNavigate();
  const setUserToken = useSetRecoilState(userTokenState);
  const setUserType = useSetRecoilState(userTypeState);
  const [selectedType, setSelectedType] = useState<'BUYER' | 'SELLER'>('BUYER');

  const handleTypeChange = (type: 'BUYER' | 'SELLER') => {
    setSelectedType(type);
  };
  const loginMutation = useMutation(loginAPI, {
    // data : res(API 호출 결과 데이터),
    // variables : req(postData 객체)
    onSuccess(data, variables, context) {
      setUserToken(data.token);
      setUserType(data.user_type);
      console.log(data);
      navigate('/');
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const postData: LoginDataForm = {
      username: data.id,
      password: data.password,
      login_type: selectedType,
    };
    loginMutation.mutate(postData);
  });
  return (
    <WrapperDiv>
      <img
        src="/assets/Logo-hodu.png"
        alt="로고"
        onClick={() => {
          navigate('/');
        }}
      />
      <LoginContainerDiv>
        <MemberType
          buyerBtnText="구매회원 로그인"
          sellerBtnText="판매회원 로그인"
          handleTypeChange={handleTypeChange}
        />

        {/* noValidate : HTML 기본적으로 유효성 검증하는 기능 끄기 */}
        <LoginForm onSubmit={onSubmit} noValidate>
          <div className="inputWrapper">
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              type="text"
              aria-invalid={isSubmitted ? (errors.id ? 'true' : 'false') : undefined}
              {...register('id', {
                required: '아이디는 필수 입력입니다.',
                pattern: {
                  value: /\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
              onBlur={() => trigger('id')}
            />
            {errors.id?.message && (
              <small className="error-message" role="alert">
                이메일 형식에 맞지 않습니다.
              </small>
            )}
          </div>
          <div className="inputWrapper">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              aria-invalid={
                isSubmitted ? (errors.password ? 'true' : 'false') : undefined
              }
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
                minLength: {
                  value: 8,
                  message: '8자리 이상 비밀번호를 사용하세요.',
                },
              })}
              onBlur={() => trigger('password')}
            />
            {errors?.password && (
              <small className="error-message" role="alert">
                8자리 이상 비밀번호를 사용하세요.
              </small>
            )}
          </div>
          <button className="login-btn" type="submit" disabled={isSubmitting}>
            로그인
          </button>
        </LoginForm>
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
  margin: 180px auto;
  img {
    display: block;
    width: 300px;
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
  width: 700px;
  padding: 0 30px;
  padding-bottom: 0;
  border: 1px solid #c4c4c4;
  border-top: 0;
  .inputWrapper {
    height: 100px;
    margin-top: 40px;
  }

  label {
    display: block;
    color: var(--sub-text-color);
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    color: var(--main-text-color);
    font-weight: 400;
    font-size: 22px;
    line-height: 14px;
    outline: none;
    border: 1px solid var(--sub-text-color);
    border-radius: 5px;
    padding: 15px;
    &::placeholder {
      color: var(--main-disabled-color);
    }
  }
  .error-message {
    color: #eb5757;
    font-size: 20px;
    display: block;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
    margin: 40px auto;
    padding: 19px 215px;
    background-color: var(--main-color);
    color: white;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    border-radius: 5px;
  }
`;
const JoinGroupDiv = styled.div`
  color: #333333;
  margin-top: 30px;
  font-size: 20px;
  a:first-child::after {
    content: '';
    border-right: 1px solid #333333;
    margin: 0 14px;
  }
`;
