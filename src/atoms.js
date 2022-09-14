import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isUserAtom = atom({
  key: "isUser",
  default: false,
  storage: sessionStorage,
});

export const isXAtom = atom({
  key: "isX",
  default: 128.6922646449,
  storage: sessionStorage,
});

export const isYAtom = atom({
  key: "isY",
  default: 35.9910080699,
  storage: sessionStorage,
});

export const isUserIDAtom = atom({
  key: "isUserID",
  default: "",
  storage: sessionStorage,
});

export const isNickNameAtom = atom({
  key: "isNickNameID",
  default: "",
  storage: sessionStorage,
});
export const isProfileImgAtom = atom({
  key: "isProfileImg",
  default: "",
  storage: sessionStorage,
});

export const isImgAtom = atom({
  key: "isImg",
  default: "",
  storage: sessionStorage,
});

export const isAccessTokenAtom = atom({
  key: "accesstoken",
  default: "",
  storage: sessionStorage,
});
export const isRefreshTokenAtom = atom({
  key: "refreshtoken",
  default: "",
  storage: sessionStorage,
});

export const isKaKaoTokenAtom = atom({
  key: "kakaotoken",
  default: "",
  storage: sessionStorage,
});

export const isCodeAtom = atom({
  key: "codeToken",
  default: "",
  storage: sessionStorage,
});
