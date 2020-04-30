import { Reducer } from "redux";
import { MapStoreActions } from "./actions";
import { NadeLight, MapCoordinates } from "../../models/Nade/Nade";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeType } from "../../models/Nade/NadeType";
import { Tickrate } from "../../models/Nade/NadeTickrate";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  IncrementNadeFavoriteCount,
  DecrementNadeFavoriteCount,
} from "./actions";

type NadesForMap = { [key: string]: NadeLight[] | undefined };

export type NadeSortingMethod = "hot" | "new" | "top";

export type MapStoreState = {
  mapViewOpen: boolean;
  nadeForMap: NadesForMap;
  currentMap?: CsgoMap;
  filterByFavorites: boolean;
  filterByType?: NadeType;
  filterByCoords?: MapCoordinates;
  filterByTickrate: Tickrate;
  sortingMethod: NadeSortingMethod;
};

const initialState: MapStoreState = {
  mapViewOpen: false,
  nadeForMap: {},
  filterByFavorites: false,
  filterByTickrate: "any",
  sortingMethod: "hot",
};

const MapStoreReducerBase: Reducer<MapStoreState, MapStoreActions> = (
  state = initialState,
  action
): MapStoreState => {
  switch (action.type) {
    case "MapStore/SetSortingMethod":
      return {
        ...state,
        sortingMethod: action.method,
      };
    case "MapStore/ReplaceNadesForMap":
      return {
        ...state,
        nadeForMap: {
          ...state.nadeForMap,
          [action.map]: action.nades,
        },
      };
    case "MapStore/SetCurrentMap":
      if (state.currentMap !== action.map) {
        return {
          ...state,
          currentMap: action.map,
          filterByFavorites: false,
          filterByTickrate: "any",
          filterByCoords: undefined,
          filterByType: undefined,
          sortingMethod: "hot",
        };
      } else {
        return {
          ...state,
          currentMap: action.map,
        };
      }
    case "MapStore/ToggleMapView":
      return {
        ...state,
        mapViewOpen: !state.mapViewOpen,
      };
    case "MapStore/FilterReset":
      return {
        ...state,
        filterByCoords: undefined,
        filterByFavorites: false,
        filterByTickrate: "any",
        filterByType: undefined,
      };
    case "MapStore/FilterByTickrate":
      return {
        ...state,
        filterByTickrate:
          action.tick === state.filterByTickrate ? "any" : action.tick,
      };
    case "MapStore/FilterByType":
      return {
        ...state,
        filterByType:
          action.payload === state.filterByType ? undefined : action.payload,
      };
    case "MapStore/FilterToggleFavorites":
      return {
        ...state,
        filterByFavorites: !state.filterByFavorites,
      };
    case "MapStore/FilterByCoordinates":
      return {
        ...state,
        filterByCoords: action.payload,
      };
    case "MapStore/IncrementNadeFavoriteCount":
      return handleIncrementNadeFavCount(state, action, "inc");
    case "MapStore/DecrementNadeFavoriteCount":
      return handleIncrementNadeFavCount(state, action, "dec");
    default:
      return state;
  }
};

function handleIncrementNadeFavCount(
  state: MapStoreState,
  action: IncrementNadeFavoriteCount | DecrementNadeFavoriteCount,
  incOrdDec: "inc" | "dec"
) {
  const currentMap = state.currentMap;

  if (!currentMap) {
    return state;
  }

  const currentMapNades = state.nadeForMap[currentMap];
  const foundNade = currentMapNades
    ? currentMapNades.find((n) => n.id === action.nadeId)
    : null;

  if (!foundNade || !currentMapNades) {
    return state;
  }

  const modifiedNade = { ...foundNade };
  if (incOrdDec === "inc") {
    modifiedNade.favoriteCount += 1;
  } else {
    modifiedNade.favoriteCount -= 1;
  }

  const otherNades = currentMapNades.filter((n) => n.id !== action.nadeId);

  const newState = {
    ...state,
    nadeForMap: {
      ...state.nadeForMap,
      [currentMap]: [...otherNades, modifiedNade],
    },
  };

  return newState;
}

const persistConfig: PersistConfig<MapStoreState> = {
  key: "settingStore",
  storage,
  whitelist: [
    "filterByFavorites",
    "filterByType",
    "filterByCoords",
    "filterByTickrate",
    "currentMap",
  ],
};

export const MapStoreReducer = persistReducer(
  persistConfig,
  MapStoreReducerBase
);
