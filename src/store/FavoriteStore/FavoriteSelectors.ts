import { AppState } from "..";

export const allFavoritesSelector = (state: AppState) => {
  return state.favoriteStore.favorites;
};

export const favoritedNadeIdsSelector = (state: AppState) => {
  return state.favoriteStore.favorites.map(f => f.nadeId);
};
