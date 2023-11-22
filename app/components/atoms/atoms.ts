import { atom } from "recoil";

const COMPONENT_NAME = "Nav";

export const TrayContentState = atom({
    key: `${COMPONENT_NAME}/TrayContentState`,
    default: '',
  });
