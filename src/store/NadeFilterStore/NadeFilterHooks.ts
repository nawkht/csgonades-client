import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapCoordinates, NadeLight } from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";
import { favoritedNadeIdsSelector } from "../FavoriteStore/FavoriteSelectors";
import {
  filterByMapCoordsAction,
  filterByTypeAction,
  resetNadeFilterAction,
  selectTickrate128,
  selectTickrate64,
  switchTickrateAction,
  toggleFilterByFavoritesAction,
  toggleMapPositionModalAction,
} from "./NadeFilterActions";
import { nadeFilterInitialState } from "./NadeFilterReducer";
import { nadeFilterState } from "./NadeFilterSelectors";

export const useNadeFilter = () => {
  const dispatch = useDispatch();

  const nadeFilters = useSelector(nadeFilterState);

  const {
    positionModalOpen,
    byFavorites,
    byTickrate,
    byCoords,
    byType,
  } = nadeFilters;

  const isDefault = useMemo(() => {
    return (
      JSON.stringify(nadeFilters) === JSON.stringify(nadeFilterInitialState)
    );
  }, [nadeFilters]);

  const resetFilter = useCallback(
    (ignoreAnalytics = false) => {
      dispatch(resetNadeFilterAction(ignoreAnalytics));
    },
    [dispatch]
  );

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      dispatch(filterByTypeAction(nadeType));
    },
    [dispatch]
  );

  const filterByMapCoords = useCallback(
    (coords: MapCoordinates) => {
      dispatch(filterByMapCoordsAction(coords));
    },
    [dispatch]
  );

  const toggleFilterByFavorites = useCallback(() => {
    dispatch(toggleFilterByFavoritesAction());
  }, [dispatch]);

  const toggleMapPositionModal = useCallback(
    (visible: boolean) => {
      dispatch(toggleMapPositionModalAction(visible));
    },
    [dispatch]
  );

  const switchTickrate = useCallback(() => {
    dispatch(switchTickrateAction());
  }, [dispatch]);

  const useTickrate64 = useCallback(() => {
    dispatch(selectTickrate64());
  }, [dispatch]);

  const useTickrate128 = useCallback(() => {
    dispatch(selectTickrate128());
  }, [dispatch]);

  return {
    isDefault,
    positionModalOpen,
    byFavorites,
    byTickrate,
    byCoords,
    byType,
    resetFilter,
    filterByType,
    filterByMapCoords,
    toggleFilterByFavorites,
    toggleMapPositionModal,
    switchTickrate,
    useTickrate64,
    useTickrate128,
  };
};

export const useNadeSorter = (onlyByType = false) => {
  const { byFavorites, byCoords, byType, byTickrate } = useSelector(
    nadeFilterState
  );
  const favoritedNades = useSelector(favoritedNadeIdsSelector);

  const nadeSorter = useCallback(
    (nades: NadeLight[]) => {
      let filteredNades = [...nades];

      filteredNades = addFavoriteToNades(filteredNades, favoritedNades);

      if (byType) {
        filteredNades = filteredNades.filter(n => n.type === byType);
      }

      if (byFavorites) {
        filteredNades = filteredNades.filter(n => n.isFavorited);
      }

      if (byCoords && !onlyByType) {
        filteredNades = nadesForCoords(filteredNades, byCoords);
      }

      if (byTickrate === "tick64") {
        filteredNades = filteredNades.filter(n => n.tickrate !== "tick128");
      } else if (byTickrate === "tick128") {
        filteredNades = filteredNades.filter(n => n.tickrate !== "tick64");
      }

      return filteredNades;
    },
    [byType, byFavorites, byCoords, onlyByType, byTickrate, favoritedNades]
  );

  return nadeSorter;
};

function nadesForCoords(nades: NadeLight[], coords: MapCoordinates) {
  const MIN_DISTANCE = 20;
  return nades.filter(n => {
    if (!n.mapEndCoord) {
      return false;
    }
    const dist = Math.sqrt(
      Math.pow(n.mapEndCoord.x - coords.x, 2) +
        Math.pow(n.mapEndCoord.y - coords.y, 2)
    );

    if (dist < MIN_DISTANCE) {
      return true;
    }
  });
}

function addFavoriteToNades(nades: NadeLight[], favIds: string[]) {
  return nades.map(n => {
    if (favIds.includes(n.id)) {
      return {
        ...n,
        isFavorited: true,
      };
    } else {
      return n;
    }
  });
}
