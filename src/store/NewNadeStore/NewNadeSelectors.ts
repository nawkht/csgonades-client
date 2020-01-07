import { AppState } from "..";

export const newNadeGfyIsLoading = (state: AppState) =>
  state.newNadeStore.loadingGfy;

export const newNadeLoadingSubmit = (state: AppState) =>
  state.newNadeStore.loadingSubmit;

export const newNadeGfyError = (state: AppState) => state.newNadeStore.gfyError;
export const newNadeImageData = (state: AppState) =>
  state.newNadeStore.imageData;
export const newNadeGfyData = (state: AppState) => state.newNadeStore.gfyData;
