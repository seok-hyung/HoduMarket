import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userTokenState = atom({
  key: 'userTokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const accountIdState = atom({
  key: 'accountIdState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const searchValueState = atom({
  key: 'searchValueState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
