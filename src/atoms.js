import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isUserAtom = atom({
  key: "isUser",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isParkAtom = atom({
  key: "isPark",
  default: false,
});

export const isPublicAtom = atom({
  key: "isPulbic",
  default: false,
});

export const isKidsAtom = atom({
  key: "isKids",
  default: false,
});

export const isInsideAtom = atom({
  key: "isInside",
  default: false,
});

export const isSomeAtom = atom({
  key: "isSome",
  default: false,
});

export const isPetAtom = atom({
  key: "isPet",
  default: false,
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
});

export const isAcessTokenAtom = atom({
  key: "acesstoken",
  default: "",
});
