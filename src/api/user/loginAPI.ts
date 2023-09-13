import { apiURL } from 'api/apiURL';
import { LoginForm } from 'model/market';

export const LoginAPI = async (formData: LoginForm) => {
  const res = await fetch(`${apiURL}/accounts/login/`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error(errorData);
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  console.log(data);
  return data;
};
