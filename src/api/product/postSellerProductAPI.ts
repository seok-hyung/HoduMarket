import { apiURL } from 'api/apiURL';
import { PostSellerProductForm } from 'model/market';

export const postSellerProductAPI = async (
  token: string,
  formData: PostSellerProductForm,
) => {
  // const data = new FormData();
  // for (const key in formData) {
  //   if (Object.prototype.hasOwnProperty.call(formData, key)) {
  //     const element = formData[key as keyof PostSellerProductForm];
  //     data.append(key, element);
  //   }
  // }
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });
  const res = await fetch(`${apiURL}/products/`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `JWT ${token}`,
      // 'Content-type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('네트워크에 문제가 있습니다.');
  }
  const result = await res.json();
  return result;
};
