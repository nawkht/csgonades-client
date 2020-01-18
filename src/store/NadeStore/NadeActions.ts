import { Dispatch } from "redux";
import { SiteStats } from "../../api/StatsApi";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { MapCoordinates, Nade, NadeLight } from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";
import { AppError } from "../../utils/ErrorUtil";

export type AddNadesForMapAction = {
  type: "@@nades/ADD_FOR_MAP";
  map: CsgoMap;
  nades: NadeLight[];
};

export type ToogleMapPositionModal = {
  type: "@@nades/TOGGLE_MAP_POSITION_MODAL";
  visisble: boolean;
};

export type FilterByMapCoordinates = {
  type: "@@nades/FILTER_BY_MAP_COORDINATES";
  coords: MapCoordinates;
  map: CsgoMap;
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

export type FilterByNadeType = {
  type: "@@nades/FILTER_BY_TYPE";
  nadeType: NadeType;
  map: CsgoMap;
};

export type ResetNadeFilter = {
  type: "@@nades/RESET_NADE_FILTER";
  map: CsgoMap;
};

export type AddSiteStats = {
  type: "@@nades/ADD_SITE_STATS";
  stats: SiteStats;
};

export type AddNadeError = {
  type: "@@nades/ADD_NADE_ERROR";
  error: AppError;
};

export type SetSortingNameAction = {
  type: "@@nades/SET_SORTING_METHOD";
  sortingMethod: SortingMethod;
  map: CsgoMap;
};

export type NadeActions =
  | AddNadesForMapAction
  | AddRcentNadesAction
  | AddSelectedNadeAction
  | StartLoadingNadeAction
  | FilterByNadeType
  | ResetNadeFilter
  | AddNadeError
  | SetSortingNameAction
  | FilterByMapCoordinates
  | ToogleMapPositionModal;

export type SortingMethod = "name" | "date" | "score";

export const setSortingMethodAction = (
  sortingMethod: SortingMethod,
  map: CsgoMap
): SetSortingNameAction => ({
  type: "@@nades/SET_SORTING_METHOD",
  sortingMethod,
  map
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

export const addNadesForMapAction = (
  map: CsgoMap,
  nades: NadeLight[]
): AddNadesForMapAction => ({
  type: "@@nades/ADD_FOR_MAP",
  map,
  nades
});

export const filterByTypeAction = (
  nadeType: NadeType,
  map: CsgoMap
): FilterByNadeType => ({
  type: "@@nades/FILTER_BY_TYPE",
  nadeType,
  map
});

export const resetNadeFilterAction = (map: CsgoMap): ResetNadeFilter => ({
  type: "@@nades/RESET_NADE_FILTER",
  map
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

export const filterByMapCoordsAction = (
  coords: MapCoordinates,
  map: CsgoMap
): FilterByMapCoordinates => ({
  type: "@@nades/FILTER_BY_MAP_COORDINATES",
  coords,
  map
});

export const toggleMapPositionModalAction = (
  visisble: boolean
): ToogleMapPositionModal => ({
  type: "@@nades/TOGGLE_MAP_POSITION_MODAL",
  visisble
});
