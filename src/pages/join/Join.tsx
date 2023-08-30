import { UserForm } from 'model/market';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { styled } from 'styled-components';
import * as S from './Join.style';
import InputBox from 'components/common/inputBox/InputBox';
import MemberType from 'components/common/memberType/MemberType';

const JoinWrapperDiv = styled.div``;
const LogoImg = styled.img``;
const JoinContainerDiv = styled.div``;

const Join = () => {
  const [form, setForm] = useState<UserForm>({
    id: '',
    password: '',
    passwordConfirm: '',
    userName: '',
    phoneNumberFirst: '',
    phoneNumberMiddle: '',
    phoneNumberLast: '',
    memberType: 'BUYER',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.password !== form.passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    console.log(form);
  };
  return (
    <S.WrapperDiv>
      {/* Logo Image */}
      <img src="/assets/Logo-hodu.png" alt="Logo" />
      <S.LoginContainerDiv>
        {/* Member Type Tabs */}
        <MemberType buyerBtnText="구매회원가입" sellerBtnText="판매회원가입" />

        {/* Login Form */}
        <S.LoginForm onSubmit={handleSubmit}>
          <InputBox
            label="아이디"
            id="id"
            name="id"
            type="text"
            value={form.id}
            onChange={handleInputChange}
            required={true}
          />
          <InputBox
            label="비밀번호"
            name="password"
            id="password"
            type="password"
            value={form.password}
            onChange={handleInputChange}
            required={true}
          />
          <InputBox
            label="비밀번호 재확인"
            name="passwordConfirm"
            id="passwordConfrim"
            type="password"
            value={form.passwordConfirm}
            onChange={handleInputChange}
            required={true}
          />
          <InputBox
            label="이름"
            name="userName"
            id="userName"
            type="text"
            value={form.userName}
            onChange={handleInputChange}
            required={true}
          />
          <label className="phone-label" htmlFor="">
            휴대폰 번호
          </label>
          <div className="phone-number">
            <select>
              <option value="op1" selected>
                010
              </option>
              <option value="op2">011</option>
              <option value="op3">016</option>
              <option value="op4">017</option>
              <option value="op5">018</option>
              <option value="op6">019</option>
            </select>
            <InputBox
              name="phoneNumberMiddle"
              id="phoneNumberMiddle"
              type="text"
              value={form.phoneNumberMiddle}
              onChange={handleInputChange}
              required={true}
            />
            <InputBox
              name="phoneNumberLast"
              id="phoneNumberLast"
              type="text"
              value={form.phoneNumberLast}
              onChange={handleInputChange}
              required={true}
            />
          </div>

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

export default Join;
