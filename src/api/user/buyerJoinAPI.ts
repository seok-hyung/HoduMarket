import { apiURL } from 'api/apiURL';
import { PostBuyerForm } from 'model/market';

export const buyerJoinAPI = async (formData: PostBuyerForm) => {
  const res = await fetch(`${apiURL}/accounts/signup/`, {
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

  // Parse the response data as JSON
  const data = await res.json();

  console.log(data);

  return data;
};
