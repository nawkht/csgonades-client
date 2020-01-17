import { Reducer } from "redux";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { MapCoordinates, Nade, NadeLight } from "../../models/Nade/Nade";
import { assertNever } from "../../utils/Common";
import { AppError } from "../../utils/ErrorUtil";
import {
  AddNadesForMapAction,
  FilterByNadeType,
  NadeActions,
  SortingMethod
} from "./NadeActions";

export type NadeFilters = {
  smoke: boolean;
  flash: boolean;
  hegrenade: boolean;
  molotov: boolean;
  sorthingMethod: SortingMethod;
  coords?: MapCoordinates;
};

type MapNadeDate = {
  nades: NadeLight[];
  addedAt: Date;
};

type NadesByMap = { [map in CsgoMap]?: MapNadeDate };

export type NadeState = {
  readonly nadesByMap: NadesByMap;
  readonly recentNades: NadeLight[];
  readonly selectedNade?: Nade;
  readonly loadingNadesForMap: boolean;
  readonly nadeFilter: NadeFilters;
  readonly error?: AppError;
  readonly positionModalOpen: boolean;
};

const initialState: NadeState = {
  nadesByMap: {},
  recentNades: [],
  loadingNadesForMap: false,
  positionModalOpen: false,
  nadeFilter: {
    flash: false,
    hegrenade: false,
    molotov: false,
    smoke: false,
    sorthingMethod: "score"
  }
};

export const NadeReducer: Reducer<NadeState, NadeActions> = (
  state = initialState,
  action
): NadeState => {
  switch (action.type) {
    case "@@nades/ADD_FOR_MAP":
      return handleAddNade(action, state);
    case "@@nades/FILTER_BY_MAP_COORDINATES":
      return {
        ...state,
        nadeFilter: {
          ...state.nadeFilter,
          coords: action.coords
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
        nadeFilter: initialState.nadeFilter
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
      return {
        ...state,
        nadeFilter: {
          ...state.nadeFilter,
          sorthingMethod: action.sortingMethod
        }
      };
    case "@@nades/TOGGLE_MAP_POSITION_MODAL":
      return {
        ...state,
        positionModalOpen: action.visisble
      };
    default:
      assertNever(action);
      return state;
  }
};

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

  if (prevState.nadeFilter[action.nadeType]) {
    return {
      ...prevState,
      nadeFilter: {
        ...prevState.nadeFilter,
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
      nadeFilter: {
        ...prevState.nadeFilter,
        ...defaults
      }
    };
  }
}
