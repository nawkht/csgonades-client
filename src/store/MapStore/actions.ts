import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeLight, MapCoordinates } from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";
import { Tickrate } from "../../models/Nade/NadeTickrate";

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

export type MapStoreActions =
  | SetCurrentMap
  | ReplaceNadesForMap
  | ToggleMapview
  | FilterByCoordinates
  | FilterByType
  | FilterToggleFavorites
  | FilterReset
  | FilterByTickrate;
