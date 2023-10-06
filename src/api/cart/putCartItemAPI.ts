import { apiURL } from 'api/apiURL';
import { PutCartItemForm } from 'model/market';

export async function putCartItem({ token, urlId, orderData }: PutCartItemForm) {
  try {
    const response = await fetch(`${apiURL}/cart/${urlId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('데이터를 가져오는데 문제가 생겼습니다.', error);
  }
}
