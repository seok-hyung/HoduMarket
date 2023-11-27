import React, { ChangeEvent, useState, FormEvent } from 'react';
import InputBox from 'components/common/inputBox/InputBox';
import { SellerJoinFormProps } from 'model/market';

const SellerSignUpForm = ({ form, setForm }: SellerJoinFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="seller-form">
      <div className="idBox">
        <InputBox
          label="아이디"
          id="id"
          name="id"
          type="text"
          value={form.id}
          onChange={handleInputChange}
          required={true}
        />
        <button>중복확인</button>
      </div>
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
      <label className="phone-label" htmlFor="phone-label">
        휴대폰 번호
      </label>
      <div className="phone-number">
        <select
          name="phoneNumFirst"
          value={form.phoneNumFirst}
          onChange={handleInputChange}
        >
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="108">018</option>
          <option value="019">019</option>
        </select>
        <InputBox
          name="phoneNumMiddle"
          id="phoneNumMiddle"
          type="text"
          value={form.phoneNumMiddle}
          onChange={handleInputChange}
          required={true}
        />
        <InputBox
          name="phoneNumLast"
          id="phoneNumLast"
          type="text"
          value={form.phoneNumLast}
          onChange={handleInputChange}
          required={true}
        />
      </div>
      <div className="businessNumberBox">
        <InputBox
          label="사업자 등록번호"
          name="businessNumber"
          id="businessNumber"
          type="text"
          value={form.businessNumber}
          onChange={handleInputChange}
        />
        <button>인증</button>
      </div>
      <InputBox
        label="스토어 이름"
        name="storeName"
        id="storeName"
        type="text"
        value={form.storeName}
        onChange={handleInputChange}
        required={true}
      />
    </div>
  );
};

export default SellerSignUpForm;
