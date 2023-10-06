import { apiURL } from 'api/apiURL';

export const deleteCartItemAPI = async (token: string, cart_item_id: number) => {
  const res = await fetch(`${apiURL}/cart/${cart_item_id}/`, { method: 'DELETE' });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res;
};
