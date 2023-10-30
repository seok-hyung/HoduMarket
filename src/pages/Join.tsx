import React, { FormEvent, useState } from 'react';

import { styled } from 'styled-components';

import MemberType from 'components/common/memberType/MemberType';
import BuyerJoinForm from 'components/join/BuyerJoinForm';
import SellerJoinForm from 'components/join/SellerJoinForm';
import { PostBuyerForm, PostSellerForm, UserForm } from 'model/market';
import { useMutation } from 'react-query';
import { buyerJoinAPI } from 'api/user/buyerJoinAPI';
import { sellerJoinAPI } from 'api/user/sellerJoinAPI';
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

  const buyerMutation = useMutation(buyerJoinAPI, {
    onSuccess: (data) => {
      navigate('/login');
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const sellerMutation = useMutation(sellerJoinAPI, {
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
    <WrapperDiv>
      <img src="/assets/Logo-hodu.png" alt="Logo" />
      <LoginContainerDiv>
        <MemberType
          buyerBtnText="구매회원가입"
          sellerBtnText="판매회원가입"
          handleTypeChange={handleTypeChange}
        />
        <LoginForm onSubmit={onSubmit}>
          {formType === 'BUYER' ? (
            <BuyerJoinForm form={form} setForm={setForm} />
          ) : (
            <SellerJoinForm form={form} setForm={setForm} />
          )}
          <button className="login-btn">회원가입</button>
        </LoginForm>

        <JoinGroupDiv>
          <a href="/join">회원가입</a>
          <a href="/find-password">비밀번호 찾기</a>
        </JoinGroupDiv>
      </LoginContainerDiv>
    </WrapperDiv>
  );
};

export default Join;

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
  .idBox,
  .businessNumberBox {
    input {
      width: 70%;
      margin-right: 12px;
    }
    button {
      background-color: var(--main-color);
      width: calc(30% - 12px);
      padding: 15px;
      border-radius: 5px;
      color: white;
      font-size: 16px;
    }
  }
  .buyer-form,
  .seller-form {
    > div,
    > input {
      margin-bottom: 35px;
    }
  }
  .buyer-form {
    > div:last-of-type {
      margin-bottom: 0;
    }
  }
  .seller-form {
    > input:last-of-type {
      margin-bottom: 0;
    }
  }

  .phone-label,
  .email-label {
    display: block;
    color: var(--sub-text-color);
    margin-bottom: 15px;
  }
  .phone-number {
    display: flex;
    gap: 5px;
    select {
      flex-basis: 33%;
      display: block;
      font-size: 20px;
      border-radius: 5px;
      text-align: center;
      padding: 15px;
    }
    input {
      flex-basis: 33%;
      border: 1px solid var(--sub-text-color);
      border-radius: 5px;
      text-align: center;
    }
  }
  .login-btn {
    background-color: var(--main-color);
    width: 100%;
    margin: 24px 0;
    color: white;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    border-radius: 5px;
    padding: 19px 200px;
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
