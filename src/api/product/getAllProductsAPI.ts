import { apiURL } from 'api/apiURL';

export const getAllProductsAPI = async (page: number) => {
  try {
    const response = await fetch(`${apiURL}/products/?page=${page}`);

    if (!response.ok) {
      throw new Error('네트워크에 문제가 있습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상품 데이터를 가져오는데 문제가 있습니다.', error);
  }
};
