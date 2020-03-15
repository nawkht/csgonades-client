import { AppState } from "..";

export const allNadesSelector = (state: AppState) => state.mapStore.nadeForMap;

export const currentMapSelector = (state: AppState) =>
  state.mapStore.currentMap;

export const filterByTypeSelector = (state: AppState) =>
  state.mapStore.filterByType;

export const filterByCoordsSelector = (state: AppState) =>
  state.mapStore.filterByCoords;

export const filterByTickrateSelector = (state: AppState) =>
  state.mapStore.filterByTickrate;

export const filterByFavoritesSelector = (state: AppState) =>
  state.mapStore.filterByFavorites;

export const mapViewOpenSelector = (state: AppState) =>
  state.mapStore.mapViewOpen;
