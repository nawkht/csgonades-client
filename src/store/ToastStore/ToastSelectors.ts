import { AppState } from "..";

export const toastSelector = (state: AppState) => {
  return state.toastStore.toasts;
};
