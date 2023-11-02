import { apiURL } from 'api/apiURL';

export const deleteSellerProductAPI = async (token: string, product_id: number) => {
  const res = await fetch(`${apiURL}/products/${product_id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `JWT ${token}`,
      'Content-type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res;
};
