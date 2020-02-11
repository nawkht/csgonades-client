import { Reducer } from "redux";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { Nade, NadeLight } from "../../models/Nade/Nade";
import { assertNever } from "../../utils/Common";
import { AppError } from "../../utils/ErrorUtil";
import {
  AddNadesForMapAction,
  NadeActions,
  OnFavoriteNadeAction,
  OnUnFavoriteNadeAction,
} from "./NadeActions";

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
  readonly error?: AppError;
};

const initialState: NadeState = {
  nadesByMap: {},
  recentNades: [],
  loadingNadesForMap: false,
};

export const NadeReducer: Reducer<NadeState, NadeActions> = (
  state = initialState,
  action
): NadeState => {
  switch (action.type) {
    case "@@nades/ADD_FOR_MAP":
      return handleAddNade(action, state);
    case "@@nades/add_selected":
      return {
        ...state,
        selectedNade: action.nade,
        error: undefined,
      };
    case "@@nades/START_LOADING":
      return {
        ...state,
        loadingNadesForMap: true,
        error: undefined,
      };
    case "@@nades/ADD_RECENT":
      return {
        ...state,
        recentNades: action.nades,
        error: undefined,
      };
    case "@@nades/ADD_NADE_ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "@@nades/CLEAR_SELECTED":
      return {
        ...state,
        selectedNade: undefined,
      };
    case "@@nades/ON_FAVORITE_NADE":
      return handleOnAddFavorite(action, state);
    case "@@nades/ON_UNFAVORITE_NADE":
      return handleOnUnFavorite(action, state);
    default:
      assertNever(action);
      return state;
  }
};

function handleOnAddFavorite(
  action: OnFavoriteNadeAction,
  state: NadeState
): NadeState {
  const updateSelected = state.selectedNade
    ? { ...state.selectedNade }
    : undefined;
  const nadesByMap = {
    ...state.nadesByMap,
  };

  if (updateSelected) {
    updateSelected.favoriteCount += 1;
  }

  if (action.nade.map) {
    // Update nade count if we find it in the nadesForMap dict
    nadesByMap[action.nade.map]?.nades.forEach(n => {
      if (n.id === action.nade.id) {
        n.favoriteCount += 1;
      }
    });
  }

  return {
    ...state,
    selectedNade: updateSelected,
    nadesByMap: nadesByMap,
  };
}

function handleOnUnFavorite(
  action: OnUnFavoriteNadeAction,
  state: NadeState
): NadeState {
  const updateSelected = state.selectedNade
    ? { ...state.selectedNade }
    : undefined;
  const nadesByMap = {
    ...state.nadesByMap,
  };

  if (updateSelected) {
    updateSelected.favoriteCount -= 1;
  }

  if (action.nade.map) {
    // Update nade count if we find it in the nadesForMap dict
    nadesByMap[action.nade.map]?.nades.forEach(n => {
      if (n.id === action.nade.id) {
        n.favoriteCount -= 1;
      }
    });
  }

  return {
    ...state,
    selectedNade: updateSelected,
    nadesByMap: nadesByMap,
  };
}

function handleAddNade(
  action: AddNadesForMapAction,
  state: NadeState
): NadeState {
  const nadesByMap = { ...state.nadesByMap };
  nadesByMap[action.map] = {
    nades: action.nades,
    addedAt: new Date(),
  };
  return {
    ...state,
    nadesByMap,
    loadingNadesForMap: false,
    error: undefined,
  };
}
