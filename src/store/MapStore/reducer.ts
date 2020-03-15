import { Reducer } from "redux";
import { MapStoreActions } from "./actions";
import { NadeLight, MapCoordinates } from "../../models/Nade/Nade";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeType } from "../../models/Nade/NadeType";
import { Tickrate } from "../../models/Nade/NadeTickrate";

type NadesForMap = { [key: string]: NadeLight[] | undefined };

export type MapStoreState = {
  mapViewOpen: boolean;
  nadeForMap: NadesForMap;
  currentMap?: CsgoMap;
  filterByFavorites: boolean;
  filterByType?: NadeType;
  filterByCoords?: MapCoordinates;
  filterByTickrate: Tickrate;
};

const initialState: MapStoreState = {
  mapViewOpen: false,
  nadeForMap: {},
  filterByFavorites: false,
  filterByTickrate: "any",
};

const defaultFilter = {
  filterByFavorites: false,
  filterByTickrate: "any",
  filterByCoords: undefined,
  filterByType: undefined,
};

export const MapStoreReducer: Reducer<MapStoreState, MapStoreActions> = (
  state = initialState,
  action
): MapStoreState => {
  switch (action.type) {
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
    default:
      return state;
  }
};
