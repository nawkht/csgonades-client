import { Reducer } from "redux";
import { NadeLight, Nade } from "../../models/Nade/Nade";
import { NadeActions, FilterByNadeType, SortingMethod } from "./NadeActions";
import { NadeFilterOptions } from "../../api/NadeApi";
import { SiteStats } from "../../api/StatsApi";
import { AppError } from "../../utils/ErrorUtil";
import moment from "moment";

export type NadeState = {
  sorthingMethod: SortingMethod;
  nadesForMap: NadeLight[];
  recentNades: NadeLight[];
  selectedNade?: Nade;
  loadingNadesForMap: boolean;
  nadeFilter: NadeFilterOptions;
  siteStats: SiteStats;
  error?: AppError;
};

const initialState: NadeState = {
  sorthingMethod: "date",
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
        nadesForMap: sortNades(state.sorthingMethod, action.nades),
        error: undefined
      };
    case "@@nades/add_selected":
      return {
        ...state,
        selectedNade: action.nade,
        error: undefined
      };
    case "@@nades/START_LOADING":
      return {
        ...state,
        loadingNadesForMap: true,
        error: undefined
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
        recentNades: action.nades,
        error: undefined
      };
    case "@@nades/ADD_NADE_ERROR":
      return {
        ...state,
        error: action.error
      };
    case "@@nades/SET_SORTING_METHOD":
      const sortedNades = sortNades(action.sortingMethod, state.nadesForMap);
      return {
        ...state,
        sorthingMethod: action.sortingMethod,
        nadesForMap: sortedNades
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

function sortNades(method: SortingMethod, nades: NadeLight[]) {
  const nadeCopy = [...nades];
  switch (method) {
    case "name":
      nadeCopy.sort((a, b) => {
        return (a.title || "").localeCompare(b.title || "");
      });
      return nadeCopy;
    default:
      nadeCopy.sort((a, b) => {
        return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf();
      });
      return nadeCopy;
  }
}
