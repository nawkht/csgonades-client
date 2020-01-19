import { AppState } from "..";

export const allFavoritesSelector = (state: AppState) => {
  return state.favoriteStore.favorites;
};

export const favoritedNades = (state: AppState) => {
  return state.favoriteStore.favoritedNades;
};

export const isLoadingFavoritedNadesSelector = (state: AppState) => {
  return state.favoriteStore.loadingFavoritedNade;
};

export const favoritedNadeIdsSelector = (state: AppState) => {
  return state.favoriteStore.favorites.map(f => f.nadeId);
};
