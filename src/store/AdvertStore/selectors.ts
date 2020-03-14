import { AppState } from "..";

export const adCodeSelector = (page: string) => (state: AppState) => {
  return state.advertStore.pageAds[page];
};
