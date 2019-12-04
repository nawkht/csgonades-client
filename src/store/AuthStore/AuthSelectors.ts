import { AppState } from "..";

export const userSelector = (state: AppState) => {
  return state.auth.user;
};

export const tokenSelector = (state: AppState) => {
  return state.auth.token;
};
