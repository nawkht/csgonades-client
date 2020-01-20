import { Reducer } from "redux";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { MapCoordinates, Nade, NadeLight } from "../../models/Nade/Nade";
import { assertNever } from "../../utils/Common";
import { AppError } from "../../utils/ErrorUtil";
import {
  AddNadesForMapAction,
  FilterByFavorites,
  FilterByNadeType,
  NadeActions,
  SortingMethod
} from "./NadeActions";

export type NadeFilters = {
  smoke: boolean;
  flash: boolean;
  hegrenade: boolean;
  molotov: boolean;
  sortingMethod: SortingMethod;
  favorites: boolean;
  coords?: MapCoordinates;
};

type MapNadeDate = {
  nades: NadeLight[];
  addedAt: Date;
};

type NadesByMap = { [map in CsgoMap]?: MapNadeDate };

type FilterByMap = { [map in CsgoMap]: NadeFilters };

export type NadeState = {
  readonly nadesByMap: NadesByMap;
  readonly filterByMap: FilterByMap;
  readonly recentNades: NadeLight[];
  readonly selectedNade?: Nade;
  readonly loadingNadesForMap: boolean;
  readonly error?: AppError;
  readonly positionModalOpen: boolean;
};

const defaultFilter: NadeFilters = {
  flash: false,
  hegrenade: false,
  molotov: false,
  smoke: false,
  favorites: false,
  sortingMethod: "score"
};

const initialState: NadeState = {
  nadesByMap: {},
  filterByMap: {
    cache: defaultFilter,
    cobblestone: defaultFilter,
    dust2: defaultFilter,
    inferno: defaultFilter,
    mirage: defaultFilter,
    nuke: defaultFilter,
    overpass: defaultFilter,
    train: defaultFilter,
    vertigo: defaultFilter
  },
  recentNades: [],
  loadingNadesForMap: false,
  positionModalOpen: false
};

export const NadeReducer: Reducer<NadeState, NadeActions> = (
  state = initialState,
  action
): NadeState => {
  switch (action.type) {
    case "@@nades/ADD_FOR_MAP":
      return handleAddNade(action, state);
    case "@@nades/FILTER_BY_MAP_COORDINATES":
      const filterForMap = { ...state.filterByMap[action.map] };
      filterForMap.coords = action.coords;

      return {
        ...state,
        filterByMap: {
          ...state.filterByMap,
          [action.map]: filterForMap
        }
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
    case "@@nades/FILTER_BY_TYPE":
      return handleFilterByType(action, state);
    case "@@nades/RESET_NADE_FILTER":
      return {
        ...state,
        filterByMap: {
          ...state.filterByMap,
          [action.map]: defaultFilter
        }
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
      const filter = { ...state.filterByMap[action.map] };
      filter.sortingMethod = action.sortingMethod;

      return {
        ...state,
        filterByMap: {
          ...state.filterByMap,
          [action.map]: filter
        }
      };
    case "@@nades/TOGGLE_MAP_POSITION_MODAL":
      return {
        ...state,
        positionModalOpen: action.visisble
      };
    case "@@@nades/FILTER_BY_FAVORITES":
      return handleFavoriteFilterToggle(state, action);
    default:
      assertNever(action);
      return state;
  }
};

function handleFavoriteFilterToggle(
  state: NadeState,
  action: FilterByFavorites
): NadeState {
  const filter = { ...state.filterByMap[action.map] };
  filter.favorites = !filter.favorites;

  return {
    ...state,
    filterByMap: {
      ...state.filterByMap,
      [action.map]: filter
    }
  };
}

function handleAddNade(
  action: AddNadesForMapAction,
  state: NadeState
): NadeState {
  const nadesByMap = { ...state.nadesByMap };
  nadesByMap[action.map] = {
    nades: action.nades,
    addedAt: new Date()
  };
  return {
    ...state,
    nadesByMap,
    loadingNadesForMap: false,
    error: undefined
  };
}

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

  const filter = { ...prevState.filterByMap[action.map] };

  if (filter[action.nadeType]) {
    return {
      ...prevState,
      filterByMap: {
        ...prevState.filterByMap,
        [action.map]: {
          ...filter,
          flash: false,
          hegrenade: false,
          molotov: false,
          smoke: false
        }
      }
    };
  } else {
    defaults[action.nadeType] = true;
    return {
      ...prevState,
      filterByMap: {
        ...prevState.filterByMap,
        [action.map]: {
          ...filter,
          ...defaults
        }
      }
    };
  }
}
