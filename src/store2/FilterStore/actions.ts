import { MapCoordinates, NadeLight } from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";

export type ReplaceNades = {
  type: "@@nadefilter/REPLACE_NADES";
  payload: NadeLight[];
};

export type ToogleMapPositionModal = {
  type: "@@nadefilter/TOGGLE_MAP_POSITION_MODAL";
};

export type FilterByMapCoordinates = {
  type: "@@nadefilter/FILTER_BY_MAP_COORDINATES";
  payload: MapCoordinates;
};

export type FilterByNadeType = {
  type: "@@nadefilter/FILTER_BY_TYPE";
  payload: NadeType;
};

export type ToggleFilterByFavorites = {
  type: "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES";
};

export type ResetNadeFilter = {
  type: "@@nadefilter/RESET_NADE_FILTER";
};

type ClickTickrate64 = {
  type: "@@nadefilter/CLICK_TICKRATE_64";
};

type ClickTickrate128 = {
  type: "@@nadefilter/CLICK_TICKRATE_128";
};

export type NadeFilterActions =
  | ReplaceNades
  | ToogleMapPositionModal
  | FilterByMapCoordinates
  | FilterByNadeType
  | ToggleFilterByFavorites
  | ResetNadeFilter
  | ClickTickrate64
  | ClickTickrate128;
