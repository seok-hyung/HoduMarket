import React, { FormEvent, useState } from 'react';

import * as S from './Join.style';

import MemberType from 'components/common/memberType/MemberType';
import BuyerJoinForm from 'components/join/BuyerJoinForm';
import SellerJoinForm from 'components/join/SellerJoinForm';
import { PostBuyerForm, PostSellerForm, UserForm } from 'model/market';
import { useMutation } from 'react-query';
import { BuyerJoinAPI } from 'api/user/buyerJoinAPI';
import { SellerJoinAPI } from 'api/user/sellerJoinAPI';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const navigate = useNavigate();
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
    businessNumber: '',
    storeName: '',
  });
  const handleTypeChange = (type: 'BUYER' | 'SELLER') => {
    setForm((prevState) => ({ ...prevState, type }));
    setFormType(type);
  };

  const buyerMutation = useMutation(BuyerJoinAPI,{
    onSuccess: (data) => {
      navigate('/login');
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const sellerMutation = useMutation(SellerJoinAPI,{
    onSuccess: (data) => {
      navigate('/login');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.password !== form.passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    if (form.type === 'BUYER') {
      const postData: PostBuyerForm = {
        username: form.id,
        password: form.password,
        password2: form.passwordConfirm,
        phone_number: `${form.phoneNumFirst}${form.phoneNumMiddle}${form.phoneNumLast}`,
        name: form.userName,
      };
      buyerMutation.mutate(postData);
    } else if (form.type === 'SELLER') {
      const postData: PostSellerForm = {
        username: form.id,
        password: form.password,
        password2: form.passwordConfirm,
        phone_number: `${form.phoneNumFirst}${form.phoneNumMiddle}${form.phoneNumLast}`,
        name: form.userName,
        company_registration_number: form.businessNumber,
        store_name: form.storeName,
      };
      sellerMutation.mutate(postData);
    }
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
        <S.LoginForm onSubmit={onSubmit}>
          {formType === 'BUYER' ? (
            <BuyerJoinForm form={form} setForm={setForm} />
          ) : (
            <SellerJoinForm form={form} setForm={setForm} />
          )}
          {/* Submit Button */}
          <button className="login-btn">회원가입</button>
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
