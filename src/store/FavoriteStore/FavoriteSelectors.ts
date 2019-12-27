import { AppState } from "..";

export const allFavoritesSelector = (state: AppState) => {
  return state.favoriteStore.favorites;
};
