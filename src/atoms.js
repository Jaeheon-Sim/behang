import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isUserAtom = atom({
  key: "isUser",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isXAtom = atom({
  key: "isX",
  default: 128.6922646449,
  effects_UNSTABLE: [persistAtom],
});

export const isYAtom = atom({
  key: "isY",
  default: 35.9910080699,
  effects_UNSTABLE: [persistAtom],
});

export const isUserIDAtom = atom({
  key: "isUserID",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isNickNameAtom = atom({
  key: "isNickNameID",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const isProfileImgAtom = atom({
  key: "isProfileImg",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isImgAtom = atom({
  key: "isImg",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isAccessTokenAtom = atom({
  key: "accesstoken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const isRefreshTokenAtom = atom({
  key: "refreshtoken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isKaKaoTokenAtom = atom({
  key: "kakaotoken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isCodeAtom = atom({
  key: "codeToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
