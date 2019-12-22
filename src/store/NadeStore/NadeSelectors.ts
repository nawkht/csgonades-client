import { AppState } from "..";

export const nadesSelector = (state: AppState) => {
  return state.nadeStore.nades;
};

export const selectedNadeSelector = (state: AppState) => {
  return state.nadeStore.selectedNade;
};
