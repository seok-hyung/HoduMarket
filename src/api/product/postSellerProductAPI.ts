import { apiURL } from 'api/apiURL';

export const postSellerProductAPI = async (
  token: string,
  formData: PostSellerProductForm,
) => {
  const res = await fetch(`${apiURL}/products`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      Authorization: `JWT ${token}`,
      'Content-type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('네트워크에 문제가 있습니다.');
  }
  const data = await res.json();
  return data;
};

type PostSellerProductForm = {
  product_name: string;
  image: File;
  price: number;
  shipping_method: 'PARCEL' | 'DELIVERY';
  shipping_fee: number;
  stock: number;
  product_info: string;
};
