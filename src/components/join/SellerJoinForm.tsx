import React, { ChangeEvent, useState, FormEvent } from 'react';
import InputBox from 'components/common/inputBox/InputBox';
import { SellerJoinFormProps } from 'model/market';
import { useMutation } from 'react-query';
import { SellerJoinAPI } from 'api/user/sellerJoinAPI';

const SellerJoinForm = ({ form, setForm }: SellerJoinFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const mutation = useMutation(SellerJoinAPI);
  // const onSubmit = (e: FormEvent) => {
  //   console.log(form);
  //   e.preventDefault(); // 페이지 새로고침 방지
  //   const postData: PostSellerForm = {
  //     username: form.id,
  //     password: form.password,
  //     password2: form.passwordConfirm,
  //     phone_number: `${form.phoneNumFirst}${form.phoneNumMiddle}${form.phoneNumLast}`,
  //     name: form.userName,
  //     company_registration_number: form.businessNumber,
  //     store_name: form.storeName,
  //   };
  //   mutation.mutate(postData);
  // };
  // // 로딩 상태
  // if (mutation.isLoading) return <div>Submitting...</div>;

  // // 에러 상태
  // if (mutation.isError) return <div>Error submitting data</div>;

  // // 성공 상태
  // if (mutation.isSuccess) return <div>Data submitted successfully</div>;

  return (
    <div className="seller-form">
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
      {/* <label className="email-label" htmlFor="email-label">
        이메일
      </label>
      <div className="email">
        <InputBox
          name="emailId"
          id="emailId"
          type="text"
          value={form.emailId}
          onChange={handleInputChange}
          required={true}
        />
        <div>@</div>
        <InputBox
          name="emailAddress"
          id="emailAddress"
          type="text"
          value={form.emailAddress}
          onChange={handleInputChange}
          required={true}
        />
      </div> */}
      <InputBox
        label="사업자 등록번호"
        name="businessNumber"
        id="businessNumber"
        type="text"
        value={form.businessNumber}
        onChange={handleInputChange}
      />
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

export default SellerJoinForm;
