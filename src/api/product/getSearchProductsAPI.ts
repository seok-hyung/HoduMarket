import { apiURL } from 'api/apiURL';

export const getSearchProducstAPI = async (searchValue: string) => {
  try {
    const res = await fetch(`${apiURL}/?search=${searchValue}`);

    if (!res.ok) {
      throw new Error('네트워크에 문제가 있습니다.');
    }
    return res.json();
  } catch (error) {
    console.log('상품 검색 데이터를 가져오는데 문제가 있습니다.', error);
  }
};
