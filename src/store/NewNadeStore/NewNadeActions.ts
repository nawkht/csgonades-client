import { GfycatData } from "../../models/Nade/GfycatData";

type NewNadeImageError = {
  type: "@@newnade/IMG_ERROR";
  error: string;
};

// TODO: Handle image error

type NewNadeSubmitStartLoading = {
  type: "@@newnade/SUBMIT_START_LOAD";
};

export const newNadeSubmitStartLoadingAction = (): NewNadeSubmitStartLoading => ({
  type: "@@newnade/SUBMIT_START_LOAD"
});

type NewNadeGfyError = {
  type: "@@newnade/GFY_ERROR";
  error: string;
};

export const newNadeErrorAction = (error: string): NewNadeGfyError => ({
  type: "@@newnade/GFY_ERROR",
  error
});

type NewNadeClearAction = {
  type: "@@newnade/CLEAR_ALL";
};

export const nadeNadeClearAction = (): NewNadeClearAction => ({
  type: "@@newnade/CLEAR_ALL"
});

type NewNadeSumbitError = {
  type: "@@newnade/SUBMIT_ERROR";
};

export const newNadeSubmitError = (): NewNadeSumbitError => ({
  type: "@@newnade/SUBMIT_ERROR"
});

type NewNadeAddGfycat = {
  type: "@@newnade/ADD_GFYCAT";
  gfyData: GfycatData;
};

export const newNadeAddGfyDataAction = (
  gfyData: GfycatData
): NewNadeAddGfycat => ({
  type: "@@newnade/ADD_GFYCAT",
  gfyData
});

type NewNadeAddImage = {
  type: "@@newnade/ADD_IMG";
  imgData: string;
};

export const newNadeAddImageAction = (imgData: string): NewNadeAddImage => ({
  type: "@@newnade/ADD_IMG",
  imgData
});

type NewNadeStartGfyLoading = {
  type: "@@newnade/START_LOADING_GFY";
};

export const newNadeStartLoadingAction = (): NewNadeStartGfyLoading => ({
  type: "@@newnade/START_LOADING_GFY"
});

export type NewNadeActions =
  | NewNadeAddGfycat
  | NewNadeClearAction
  | NewNadeGfyError
  | NewNadeAddImage
  | NewNadeStartGfyLoading
  | NewNadeSumbitError
  | NewNadeImageError
  | NewNadeSubmitStartLoading;
