import React, { FormEvent, useState } from 'react';

import * as S from './Join.style';

import MemberType from 'components/common/memberType/MemberType';
import BuyerJoinForm from 'components/buyerJoinForm/BuyerJoinForm';
import SellerJoinForm from 'components/sellerJoinForm/SellerJoinForm';
import { UserForm } from 'model/market';
const Join = () => {
  const [formType, setFormType] = useState('BUYER');
  const [form, setForm] = useState<UserForm>({
    id: '',
    password: '',
    passwordConfirm: '',
    userName: '',
    phoneNumFirst: '010',
    phoneNumMiddle: '',
    phoneNumLast: '',
    type: 'BUYER',
    emailId: '',
    emailAddress: '',
    businessNumber: '',
    storeName: '',
  });
  const handleTypeChange = (type: 'BUYER' | 'SELLER') => {
    setForm((prevState) => ({ ...prevState, type }));
    setFormType(type);
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
        <MemberType
          buyerBtnText="구매회원가입"
          sellerBtnText="판매회원가입"
          handleTypeChange={handleTypeChange}
        />

        {/* Login Form */}
        <S.LoginForm onSubmit={handleSubmit}>
          {formType === 'BUYER' ? (
            <BuyerJoinForm form={form} setForm={setForm} />
          ) : (
            <SellerJoinForm form={form} setForm={setForm} />
          )}
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
