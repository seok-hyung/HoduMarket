import { apiURL } from 'api/apiURL';
import { PostSellerProductForm } from 'model/market';

export const postSellerProductAPI = async (
  token: string,
  formData: PostSellerProductForm,
) => {
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });
  const res = await fetch(`${apiURL}/products/`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log(error);
  }
  const result = await res.json();
  return result;
};
