import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeLight, MapCoordinates } from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";
import { Tickrate } from "../../models/Nade/NadeTickrate";
import { NadeSortingMethod } from "./reducer";

type ReplaceNadesForMap = {
  type: "MapStore/ReplaceNadesForMap";
  map: CsgoMap;
  nades: NadeLight[];
};

type SetCurrentMap = {
  type: "MapStore/SetCurrentMap";
  map: CsgoMap;
};

type ToggleMapview = {
  type: "MapStore/ToggleMapView";
};

type FilterByCoordinates = {
  type: "MapStore/FilterByCoordinates";
  payload: MapCoordinates;
};

type FilterByType = {
  type: "MapStore/FilterByType";
  payload: NadeType;
};

type FilterToggleFavorites = {
  type: "MapStore/FilterToggleFavorites";
};

type FilterReset = {
  type: "MapStore/FilterReset";
};

type FilterByTickrate = {
  type: "MapStore/FilterByTickrate";
  tick: Tickrate;
};

type SetSortingMethod = {
  type: "MapStore/SetSortingMethod";
  method: NadeSortingMethod;
};

export type IncrementNadeFavoriteCount = {
  type: "MapStore/IncrementNadeFavoriteCount";
  nadeId: string;
};

export type DecrementNadeFavoriteCount = {
  type: "MapStore/DecrementNadeFavoriteCount";
  nadeId: string;
};

export type MapStoreActions =
  | SetCurrentMap
  | ReplaceNadesForMap
  | ToggleMapview
  | FilterByCoordinates
  | FilterByType
  | FilterToggleFavorites
  | FilterReset
  | FilterByTickrate
  | IncrementNadeFavoriteCount
  | DecrementNadeFavoriteCount
  | SetSortingMethod;
