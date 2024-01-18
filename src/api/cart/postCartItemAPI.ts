import { apiURL } from 'api/apiURL';

export const postCartItemAPI = async (
  token: string,
  formData: PostCartItemForm | undefined,
) => {
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

type PostCartItemForm = {
  product_id: number;
  quantity: number;
  check: boolean; // 장바구니에 해당 제품이 있는지 확인합니다. False일 때는 확인용 모달창을 띄워야하고, True일 때 카트에 담을 수 있습니다
};

//? res
// {
//     "my_cart": Int, // 내 카트 고유번호
//     "cart_item_id": Int, // 카트 아이템 번호/ PUT,DELETE 메소드를 사용하기 위해 필요함
//     "product_id": Int,
//     "quantity": Int
// }
