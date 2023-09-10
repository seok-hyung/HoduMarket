import { BuyerJoinAPI } from 'api/user/buyerJoinAPI';
import InputBox from 'components/common/inputBox/InputBox';
import { BuyerJoinFormProps, PostBuyerForm } from 'model/market';
import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useMutation } from 'react-query';

const BuyerJoinForm = ({ form, setForm }: BuyerJoinFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const mutation = useMutation(BuyerJoinAPI);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지
    const postData: PostBuyerForm = {
      username: form.id,
      password: form.password,
      password2: form.passwordConfirm,
      phone_number: `${form.phoneNumFirst}${form.phoneNumMiddle}${form.phoneNumLast}`,
      name: form.userName,
    };
    mutation.mutate(postData);
  };
  // 로딩 상태
  if (mutation.isLoading) return <div>Submitting...</div>;

  // 에러 상태
  if (mutation.isError) return <div>Error submitting data</div>;

  // 성공 상태
  if (mutation.isSuccess) return <div>Data submitted successfully</div>;

  return (
    <form className="buyer-form" onSubmit={onSubmit}>
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
    </form>
  );
};

export default BuyerJoinForm;
