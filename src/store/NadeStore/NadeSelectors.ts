import { AppState } from "..";

export const nadesSelector = (state: AppState) => {
  return state.nadeStore.nades;
};
