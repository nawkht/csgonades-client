import { AppState } from "..";

export const themeSelector = (state: AppState) => {
  return state.layoutStore;
};
