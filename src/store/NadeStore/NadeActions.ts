import { NadeLight, Nade } from "../../models/Nade/Nade";
import { Dispatch } from "redux";

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

export type NadeActions =
  | AddNadesAction
  | AddSelectedNadeAction
  | StartLoadingNadeAction
  | StopLoadingNadeAction;

export const addNadeAction = (nades: NadeLight[], dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/add",
    nades
  });
};

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
