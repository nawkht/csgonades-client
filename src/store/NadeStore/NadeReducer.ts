import { Reducer } from "redux";
import { NadeLight, Nade } from "../../models/Nade/Nade";
import { NadeActions, FilterByNadeType } from "./NadeActions";
import { NadeFilterOptions } from "../../api/NadeApi";
import { SiteStats } from "../../api/StatsApi";

export type NadeState = {
  nades: NadeLight[];
  selectedNade?: Nade;
  loading: boolean;
  nadeFilter: NadeFilterOptions;
  siteStats: SiteStats;
};

const initialState: NadeState = {
  nades: [],
  loading: false,
  nadeFilter: {
    flash: false,
    hegrenade: false,
    molotov: false,
    smoke: false
  },
  siteStats: {
    numNades: 0,
    numUsers: 0
  }
};

export const NadeReducer: Reducer<NadeState, NadeActions> = (
  state = initialState,
  action
): NadeState => {
  switch (action.type) {
    case "@@nades/add":
      return {
        ...state,
        nades: action.nades
      };
    case "@@nades/add_selected":
      return {
        ...state,
        selectedNade: action.nade
      };
    case "@@nades/START_LOADING":
      return {
        ...state,
        loading: true
      };
    case "@@nades/STOP_LOADING":
      return {
        ...state,
        loading: false
      };
    case "@@nades/FILTER_BY_TYPE":
      return handleFilterByType(action, state);
    case "@@nades/RESET_NADE_FILTER":
      return {
        ...state,
        nadeFilter: initialState.nadeFilter
      };
    case "@@nades/ADD_SITE_STATS":
      return {
        ...state,
        siteStats: action.stats
      };
    default:
      return state;
  }
};

function handleFilterByType(
  action: FilterByNadeType,
  prevState: NadeState
): NadeState {
  let defaults = {
    flash: false,
    hegrenade: false,
    molotov: false,
    smoke: false
  };

  if (prevState.nadeFilter[action.nadeType]) {
    return {
      ...prevState,
      nadeFilter: {
        flash: false,
        hegrenade: false,
        molotov: false,
        smoke: false
      }
    };
  } else {
    defaults[action.nadeType] = true;
    return {
      ...prevState,
      nadeFilter: defaults
    };
  }
}
