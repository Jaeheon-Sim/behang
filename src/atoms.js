import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isUserAtom = atom({
  key: "isUser",
  default: false,
  // effects_UNSTABLE: [persistAtom],
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
