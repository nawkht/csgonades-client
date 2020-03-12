import { Dispatch } from "redux";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { Nade, NadeLight } from "../../models/Nade/Nade";
import { AppError } from "../../utils/ErrorUtil";

export type AddNadesForMapAction = {
  type: "@@nades/ADD_FOR_MAP";
  map: CsgoMap;
  nades: NadeLight[];
};

type AddRcentNadesAction = {
  type: "@@nades/ADD_RECENT";
  nades: NadeLight[];
};

type AddSelectedNadeAction = {
  type: "@@nades/add_selected";
  nade: Nade;
};

type ClearSelectedNadeAction = {
  type: "@@nades/CLEAR_SELECTED";
};

type StartLoadingNadeAction = {
  type: "@@nades/START_LOADING";
};

export type AddNadeError = {
  type: "@@nades/ADD_NADE_ERROR";
  error: AppError;
};

export type OnFavoriteNadeAction = {
  type: "@@nades/ON_FAVORITE_NADE";
  nade: Nade;
};

export type OnUnFavoriteNadeAction = {
  type: "@@nades/ON_UNFAVORITE_NADE";
  nade: Nade;
};

export type NadeActions =
  | AddNadesForMapAction
  | AddRcentNadesAction
  | AddSelectedNadeAction
  | StartLoadingNadeAction
  | AddNadeError
  | ClearSelectedNadeAction
  | OnFavoriteNadeAction
  | OnUnFavoriteNadeAction;

export const onFavoriteNadeAction = (nade: Nade): OnFavoriteNadeAction => ({
  type: "@@nades/ON_FAVORITE_NADE",
  nade,
});

export const onUnFavoriteNadeAction = (nade: Nade): OnUnFavoriteNadeAction => ({
  type: "@@nades/ON_UNFAVORITE_NADE",
  nade,
});

export const addNadeError = (error: AppError): AddNadeError => ({
  type: "@@nades/ADD_NADE_ERROR",
  error,
});

export const addRecentNadesAction = (
  nades: NadeLight[]
): AddRcentNadesAction => ({
  type: "@@nades/ADD_RECENT",
  nades,
});

export const addNadesForMapAction = (
  map: CsgoMap,
  nades: NadeLight[]
): AddNadesForMapAction => ({
  type: "@@nades/ADD_FOR_MAP",
  map,
  nades,
});

export const addSelectedNadeAction = (nade: Nade, dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/add_selected",
    nade,
  });
};

export const startLoadingNadeAction = (dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/START_LOADING",
  });
};
