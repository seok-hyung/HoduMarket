import React, { ChangeEvent, FormEvent, useState } from 'react';
import { SelectedType} from 'model/market';
import styled  from 'styled-components';

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

const RoleBtn = styled.button<SelectedType>`
  width: 275px;
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #C4C4C4;

  &:first-child{border-right: 2px solid #C4C4C4};
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  
  border-bottom: ${(props) => (props.selected ? 'none' : '1px solid #C4C4C4')};
  background-color: ${(props)=>(props.selected ? '#FFF' : '#F2F2F2')};
`;
const LoginForm = styled.form`
  width: 550px;
  padding: 30px;
  padding-bottom:0;
  border: 1px solid #C4C4C4;
  border-top: 0;
  div label{
    display: block;
    font-size: 18px;
    margin: 20px 0;
    color:var(--sub-text-color);
  }
  div input{
    width: 100%;
    font-size: 18px;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--main-disabled-color);
  }
  .login-btn{
    margin: 36px 0;
    background-color: var(--main-color);
    color: white;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    border-radius: 5px;
    padding: 19px 215px;
  }
`
const JoinGroupDiv = styled.div`
  color:#333333;
  margin-top: 30px;
  a:first-child::after{
    content: '';
    border-right: 1px solid #333333;
    margin: 0 14px;
  }
`

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('BUYER');
  const [loginState, setLoginState] = useState({
    id: '',
    password: '',
    role: 'BUYER',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };
  const handleRoleChange = (role:'BUYER'|'SELLER') => {
    setLoginState(prevState=>({...prevState,role}));
    setSelectedRole(role);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(loginState);

    // 서버로 로그인 요청을 전송하거나 다른 처리를 여기서 수행하면 됩니다.
  };
  return (
    <WrapperDiv>
      {/* Logo Image */}
      <img src="/assets/Logo-hodu.png" alt="Logo" />
      <LoginContainerDiv>
        {/* Member Type Tabs */}
        <div className="login-memberType-box">
          <RoleBtn
            onClick={()=>handleRoleChange('BUYER')}
            selected={selectedRole === 'BUYER'}
          >
            구매회원 로그인
          </RoleBtn>
          <RoleBtn
            onClick={()=>handleRoleChange('SELLER')}
            selected={selectedRole === 'SELLER'}
          >
            판매회원 로그인
          </RoleBtn>
        </div>

        {/* Login Form */}
        <LoginForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              name="id"
              value={loginState.id}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              value={loginState.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button className='login-btn'>로그인</button>
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


