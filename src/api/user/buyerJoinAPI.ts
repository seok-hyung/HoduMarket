import { apiURL } from 'api/apiURL';
import { PostBuyerForm } from 'model/market';

export const BuyerJoinAPI = async (formData: PostBuyerForm) => {
  const res = await fetch(`${apiURL}/accounts/signup/`, {
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
