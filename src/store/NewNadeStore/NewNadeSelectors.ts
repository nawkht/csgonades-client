import { AppState } from "..";

export const newNadeGfyError = (state: AppState) => state.newNadeStore.error;

export const newNadeLoadingSelector = (state: AppState) =>
  state.newNadeStore.loading;

export const newNadeGfyData = (state: AppState) => state.newNadeStore.gfyData;

export const newNadeStepSelector = (state: AppState) => state.newNadeStore.step;
