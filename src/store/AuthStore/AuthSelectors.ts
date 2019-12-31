import { AppState } from "..";

export const userSelector = (state: AppState) => {
  return state.authStore.user;
};

export const tokenSelector = (state: AppState) => {
  return state.authStore.token;
};
