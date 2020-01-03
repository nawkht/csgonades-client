import { NadeLight, Nade } from "../../models/Nade/Nade";
import { Dispatch } from "redux";
import { NadeType } from "../../models/Nade/NadeType";
import { SiteStats } from "../../api/StatsApi";
import { AppError } from "../../utils/ErrorUtil";

type AddNadesAction = {
  type: "@@nades/add";
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

export type AddSiteStats = {
  type: "@@nades/ADD_SITE_STATS";
  stats: SiteStats;
};

export type AddNadeError = {
  type: "@@nades/ADD_NADE_ERROR";
  error: AppError;
};

export type NadeActions =
  | AddNadesAction
  | AddRcentNadesAction
  | AddSelectedNadeAction
  | StartLoadingNadeAction
  | StopLoadingNadeAction
  | FilterByNadeType
  | ResetNadeFilter
  | AddSiteStats
  | AddNadeError;

export const addSiteStatsAction = (stats: SiteStats): AddSiteStats => ({
  type: "@@nades/ADD_SITE_STATS",
  stats
});

export const addNadeError = (error: AppError): AddNadeError => ({
  type: "@@nades/ADD_NADE_ERROR",
  error
});

export const addRecentNadesAction = (
  nades: NadeLight[]
): AddRcentNadesAction => ({
  type: "@@nades/ADD_RECENT",
  nades
});

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
