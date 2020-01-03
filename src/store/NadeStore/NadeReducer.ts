import { Reducer } from "redux";
import { NadeLight, Nade } from "../../models/Nade/Nade";
import { NadeActions, FilterByNadeType } from "./NadeActions";
import { NadeFilterOptions } from "../../api/NadeApi";
import { SiteStats } from "../../api/StatsApi";
import { AppError } from "../../utils/ErrorUtil";

export type NadeState = {
  nadesForMap: NadeLight[];
  recentNades: NadeLight[];
  selectedNade?: Nade;
  loadingNadesForMap: boolean;
  nadeFilter: NadeFilterOptions;
  siteStats: SiteStats;
  error?: AppError;
};

const initialState: NadeState = {
  nadesForMap: [],
  recentNades: [],
  loadingNadesForMap: false,
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
        nadesForMap: action.nades
      };
    case "@@nades/add_selected":
      return {
        ...state,
        selectedNade: action.nade
      };
    case "@@nades/START_LOADING":
      return {
        ...state,
        loadingNadesForMap: true
      };
    case "@@nades/STOP_LOADING":
      return {
        ...state,
        loadingNadesForMap: false
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
    case "@@nades/ADD_RECENT":
      return {
        ...state,
        recentNades: action.nades
      };
    case "@@nades/ADD_NADE_ERROR":
      return {
        ...state,
        error: action.error
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
