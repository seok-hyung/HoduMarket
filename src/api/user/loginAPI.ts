import { apiURL } from 'api/apiURL';

type LoginForm = {
  username: string;
  password: string;
  login_type: string; // BUYER : 일반 구매자, SELLER : 판매자
};

export const LoginAPI = async (formData: LoginForm) => {
  const res = await fetch(`${apiURL}/accounts/login/`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};
