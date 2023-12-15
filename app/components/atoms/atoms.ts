import { atom } from "recoil";

const COMPONENT_NAME = "Nav";

export const TrayContentState = atom({
    key: `${COMPONENT_NAME}/TrayContentState`,
    default: '',
  });

  export const UserState = atom({
    key: `${COMPONENT_NAME}/UserState`,
    default: null,
  });

  export const TextDBState = atom({
    key: `${COMPONENT_NAME}/TextDBState`,
    default: [],
  });
