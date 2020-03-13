import { Reducer } from "react";
import { MapCoordinates, NadeLight } from "../../models/Nade/Nade";
import { Tickrate } from "../../models/Nade/NadeTickrate";
import { NadeType } from "../../models/Nade/NadeType";
import { NadeFilterActions } from "./actions";

export type FilterState = {
  nades: NadeLight[];
  byType?: NadeType;
  byFavorites: boolean;
  byCoords?: MapCoordinates;
  byTickrate: Tickrate;
  positionModalOpen: boolean;
};

export const nadeFilterReducer: Reducer<FilterState, NadeFilterActions> = (
  state,
  action
) => {
  switch (action.type) {
    case "@@nadefilter/TOGGLE_MAP_POSITION_MODAL":
      return {
        ...state,
        positionModalOpen: !state.positionModalOpen,
      };
    case "@@nadefilter/CLICK_TICKRATE_128":
      return {
        ...state,
        byTickrate: state.byTickrate === "tick128" ? "any" : "tick128",
      };
    case "@@nadefilter/CLICK_TICKRATE_64":
      return {
        ...state,
        byTickrate: state.byTickrate === "tick64" ? "any" : "tick64",
      };
    case "@@nadefilter/FILTER_BY_MAP_COORDINATES":
      return {
        ...state,
        byCoords: action.payload,
      };
    case "@@nadefilter/FILTER_BY_TYPE":
      return {
        ...state,
        byType: action.payload === state.byType ? undefined : action.payload,
      };
    case "@@nadefilter/RESET_NADE_FILTER":
      return {
        ...state,
        byCoords: undefined,
        byFavorites: false,
        byTickrate: "any",
        byType: undefined,
      };
    case "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES":
      return {
        ...state,
        byFavorites: !state.byFavorites,
      };
    default: {
      return state;
    }
  }
};
