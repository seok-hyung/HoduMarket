import { apiURL } from 'api/apiURL';

export const getCartItemAPI = async (token: string) => {
  try {
    const res = await fetch(`${apiURL}/cart/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('네트워크에 문제가 있습니다.');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('장바구니 데이터를 가져오는데 문제가 있습니다.', error);
  }
};
