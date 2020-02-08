import { Reducer } from "redux";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { Nade, NadeLight } from "../../models/Nade/Nade";
import { assertNever } from "../../utils/Common";
import { AppError } from "../../utils/ErrorUtil";
import { AddNadesForMapAction, NadeActions } from "./NadeActions";

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
    addedAt: new Date(),
  };
  return {
    ...state,
    nadesByMap,
    loadingNadesForMap: false,
    error: undefined,
  };
}
