import { apiURL } from 'api/apiURL';
import { PostCartItemForm } from 'model/market';

export const postCartItemAPI = async (token: string, formData: PostCartItemForm) => {
  const res = await fetch(`${apiURL}/cart/`, {
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
  console.log(data);

  return data;
};

//? res
// {
//     "my_cart": Int, // 내 카트 고유번호
//     "cart_item_id": Int, // 카트 아이템 번호/ PUT,DELETE 메소드를 사용하기 위해 필요함
//     "product_id": Int,
//     "quantity": Int
// }
