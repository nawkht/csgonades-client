import { GfycatData } from "../../models/Nade/GfycatData";
import { NewNadeStep } from "./NewNadeReducer";

type NewNadeStartLoading = {
  type: "@@newnade/START_LOADING";
};

export const newNadeStartLoadingAction = (): NewNadeStartLoading => ({
  type: "@@newnade/START_LOADING",
});

type NewNadeError = {
  type: "@@newnade/ERROR";
  error: string;
};

export const newNadeErrorAction = (error: string): NewNadeError => ({
  type: "@@newnade/ERROR",
  error,
});

type NewNadeClearAction = {
  type: "@@newnade/CLEAR_ALL";
};

export const nadeNadeClearAction = (): NewNadeClearAction => ({
  type: "@@newnade/CLEAR_ALL",
});

type NewNadeAddGfycat = {
  type: "@@newnade/ADD_GFYCAT";
  gfyData: GfycatData;
};

export const newNadeAddGfyDataAction = (
  gfyData: GfycatData
): NewNadeAddGfycat => ({
  type: "@@newnade/ADD_GFYCAT",
  gfyData,
});

type NewNadeSetStep = {
  type: "@@nednade/SET_STEP";
  step: NewNadeStep;
};

export const newNadeSetStep = (step: NewNadeStep): NewNadeSetStep => ({
  type: "@@nednade/SET_STEP",
  step,
});

export type NewNadeActions =
  | NewNadeAddGfycat
  | NewNadeClearAction
  | NewNadeError
  | NewNadeStartLoading
  | NewNadeSetStep;
