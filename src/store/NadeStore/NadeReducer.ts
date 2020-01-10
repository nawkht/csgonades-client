import { Reducer } from "redux";
import { NadeLight, Nade } from "../../models/Nade/Nade";
import { NadeActions, FilterByNadeType, SortingMethod } from "./NadeActions";
import { AppError } from "../../utils/ErrorUtil";
import { assertNever } from "../../utils/Common";
import { CsgoMap } from "../../models/Nade/CsGoMap";

export type NadeFilters = {
  smoke: boolean;
  flash: boolean;
  hegrenade: boolean;
  molotov: boolean;
  sorthingMethod: SortingMethod;
};

type NadesByMap = Partial<{ [map in CsgoMap]: NadeLight[] }>;

export type NadeState = {
  nadesByMap: NadesByMap;
  recentNades: NadeLight[];
  selectedNade?: Nade;
  loadingNadesForMap: boolean;
  nadeFilter: NadeFilters;
  error?: AppError;
};

const initialState: NadeState = {
  nadesByMap: {},
  recentNades: [],
  loadingNadesForMap: false,
  nadeFilter: {
    flash: false,
    hegrenade: false,
    molotov: false,
    smoke: false,
    sorthingMethod: "date"
  }
};

export const NadeReducer: Reducer<NadeState, NadeActions> = (
  state = initialState,
  action
): NadeState => {
  switch (action.type) {
    case "@@nades/ADD_FOR_MAP":
      return {
        ...state,
        nadesByMap: {
          ...state.nadesByMap,
          [action.map]: action.nades
        },
        loadingNadesForMap: false,
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
    default:
      assertNever(action);
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
