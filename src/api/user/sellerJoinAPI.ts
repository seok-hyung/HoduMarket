import { apiURL } from 'api/apiURL';
import { PostSellerForm } from 'model/market';

export const SellerJoinAPI = async (formData: PostSellerForm) => {
  const res = await fetch(`${apiURL}/accounts/signup_seller/`, {
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
