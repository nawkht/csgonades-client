import { Reducer } from "redux";
import { MapCoordinates } from "../../models/Nade/Nade";
import { Tickrate } from "../../models/Nade/NadeTickrate";
import { NadeType } from "../../models/Nade/NadeType";
import { assertNever } from "../../utils/Common";
import { NadeFilterActions } from "./NadeFilterActions";

export type NadeFilterState = {
  readonly byType?: NadeType;
  readonly byFavorites: boolean;
  readonly byCoords?: MapCoordinates;
  readonly byTickrate: Tickrate;
  readonly positionModalOpen: boolean;
};

export const nadeFilterInitialState: NadeFilterState = {
  byFavorites: false,
  byTickrate: "any",
  positionModalOpen: false,
};

export const NadeFilterReducer: Reducer<NadeFilterState, NadeFilterActions> = (
  state = nadeFilterInitialState,
  action
): NadeFilterState => {
  switch (action.type) {
    case "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES":
      return {
        ...state,
        byFavorites: !state.byFavorites,
      };
    case "@@nadefilter/FILTER_BY_MAP_COORDINATES":
      return {
        ...state,
        byCoords: action.coords,
      };
    case "@@nadefilter/FILTER_BY_TYPE":
      if (state.byType === action.nadeType) {
        return {
          ...state,
          byType: undefined,
        };
      } else {
        return {
          ...state,
          byType: action.nadeType,
        };
      }
    case "@@nadefilter/TOGGLE_MAP_POSITION_MODAL":
      return {
        ...state,
        positionModalOpen: !state.positionModalOpen,
      };
    case "@@nadefilter/RESET_NADE_FILTER":
      return nadeFilterInitialState;
    case "@@nadefilter/SWITCH_TICKRATE":
      if (state.byTickrate === "any") {
        return {
          ...state,
          byTickrate: "tick64",
        };
      } else if (state.byTickrate === "tick64") {
        return {
          ...state,
          byTickrate: "tick128",
        };
      } else {
        return {
          ...state,
          byTickrate: "any",
        };
      }
    default:
      assertNever(action);
      return state;
  }
};
