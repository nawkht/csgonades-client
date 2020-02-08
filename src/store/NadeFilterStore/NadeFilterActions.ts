import { MapCoordinates } from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";
import { Meta } from "../Analytics/AnalyticsMiddleware";

export type ToogleMapPositionModal = {
  type: "@@nadefilter/TOGGLE_MAP_POSITION_MODAL";
  visisble: boolean;
  meta: Meta;
};

export type FilterByMapCoordinates = {
  type: "@@nadefilter/FILTER_BY_MAP_COORDINATES";
  coords: MapCoordinates;
  meta: Meta;
};

export type FilterByNadeType = {
  type: "@@nadefilter/FILTER_BY_TYPE";
  nadeType: NadeType;
  meta: Meta;
};

export type ToggleFilterByFavorites = {
  type: "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES";
  meta: Meta;
};

export type ResetNadeFilter = {
  type: "@@nadefilter/RESET_NADE_FILTER";
  meta: Meta;
};

type SwitchTickrateFilter = {
  type: "@@nadefilter/SWITCH_TICKRATE";
};

export type NadeFilterActions =
  | ToogleMapPositionModal
  | FilterByMapCoordinates
  | FilterByNadeType
  | ToggleFilterByFavorites
  | ResetNadeFilter
  | SwitchTickrateFilter;

export const filterByTypeAction = (nadeType: NadeType): FilterByNadeType => ({
  type: "@@nadefilter/FILTER_BY_TYPE",
  nadeType,
  meta: {
    gaEvent: {
      label: nadeType,
    },
  },
});

export const toggleFilterByFavoritesAction = (): ToggleFilterByFavorites => ({
  type: "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES",
  meta: { gaEvent: {} },
});

export const resetNadeFilterAction = (): ResetNadeFilter => ({
  type: "@@nadefilter/RESET_NADE_FILTER",
  meta: { gaEvent: {} },
});

export const filterByMapCoordsAction = (
  coords: MapCoordinates
): FilterByMapCoordinates => ({
  type: "@@nadefilter/FILTER_BY_MAP_COORDINATES",
  coords,
  meta: {
    gaEvent: {
      label: `(${coords.x}, ${coords.y})`,
    },
  },
});

export const toggleMapPositionModalAction = (
  visisble: boolean
): ToogleMapPositionModal => ({
  type: "@@nadefilter/TOGGLE_MAP_POSITION_MODAL",
  visisble,
  meta: {
    gaEvent: {
      label: `${visisble}`,
    },
  },
});

export const switchTickrateAction = (): SwitchTickrateFilter => ({
  type: "@@nadefilter/SWITCH_TICKRATE",
});
