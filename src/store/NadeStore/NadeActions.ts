import { NadeLight, Nade } from "../../models/Nade/Nade";
import { Dispatch } from "redux";
import { NadeType } from "../../models/Nade/NadeType";

type AddNadesAction = {
  type: "@@nades/add";
  nades: NadeLight[];
};

type AddSelectedNadeAction = {
  type: "@@nades/add_selected";
  nade: Nade;
};

type StartLoadingNadeAction = {
  type: "@@nades/START_LOADING";
};

type StopLoadingNadeAction = {
  type: "@@nades/STOP_LOADING";
};

export type FilterByNadeType = {
  type: "@@nades/FILTER_BY_TYPE";
  nadeType: NadeType;
};

export type ResetNadeFilter = {
  type: "@@nades/RESET_NADE_FILTER";
};

export type NadeActions =
  | AddNadesAction
  | AddSelectedNadeAction
  | StartLoadingNadeAction
  | StopLoadingNadeAction
  | FilterByNadeType
  | ResetNadeFilter;

export const addNadeAction = (nades: NadeLight[]) => ({
  type: "@@nades/add",
  nades
});

export const filterByTypeAction = (nadeType: NadeType): FilterByNadeType => ({
  type: "@@nades/FILTER_BY_TYPE",
  nadeType
});

export const resetNadeFilterAction = (): ResetNadeFilter => ({
  type: "@@nades/RESET_NADE_FILTER"
});

export const addSelectedNadeAction = (nade: Nade, dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/add_selected",
    nade
  });
};

export const startLoadingNadeAction = (dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/START_LOADING"
  });
};

export const stopLoadingNadeAction = (dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/STOP_LOADING"
  });
};
