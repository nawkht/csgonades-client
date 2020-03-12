import { useCallback, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { MapCoordinates, NadeLight } from "../../models/Nade/Nade";
import { Tickrate } from "../../models/Nade/NadeTickrate";
import { NadeType } from "../../models/Nade/NadeType";
import { favoritedNadeIdsSelector } from "../../store/FavoriteStore/FavoriteSelectors";
import { NadeFilterContext } from "./context";

export const useToggleMapview = () => {
  const { dispatch, state } = useContext(NadeFilterContext);

  const { positionModalOpen } = state;

  const toggleMapViewVisibility = useCallback(() => {
    dispatch({
      type: "@@nadefilter/TOGGLE_MAP_POSITION_MODAL",
    });
  }, [dispatch]);

  return {
    mapViewVisisble: positionModalOpen,
    toggleMapViewVisibility,
  };
};

export const useFilterByCoords = () => {
  const { dispatch } = useContext(NadeFilterContext);

  const filterByCoords = useCallback(
    (coords: MapCoordinates) => {
      dispatch({
        type: "@@nadefilter/FILTER_BY_MAP_COORDINATES",
        payload: coords,
      });
    },
    [dispatch]
  );

  return filterByCoords;
};

export const useFilterByFavorites = () => {
  const { dispatch, state } = useContext(NadeFilterContext);

  const filterByFavorites = useCallback(() => {
    dispatch({ type: "@@nadefilter/TOGGLE_FILTER_BY_FAVORITES" });
  }, [dispatch]);

  return {
    filterByFavorites,
    byFavorite: state.byFavorites,
  };
};

export const useFilterByTickrate = () => {
  const { dispatch, state } = useContext(NadeFilterContext);

  const filterByTickrate64 = useCallback(() => {
    dispatch({ type: "@@nadefilter/CLICK_TICKRATE_64" });
  }, [dispatch]);

  const filterByTickrate128 = useCallback(() => {
    dispatch({ type: "@@nadefilter/CLICK_TICKRATE_128" });
  }, [dispatch]);

  return {
    byTickrate: state.byTickrate,
    filterByTickrate64,
    filterByTickrate128,
  };
};

export const useFilterByType = () => {
  const { state, dispatch } = useContext(NadeFilterContext);

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      dispatch({
        type: "@@nadefilter/FILTER_BY_TYPE",
        payload: nadeType,
      });
    },
    [dispatch]
  );

  return {
    byType: state.byType,
    filterByType,
  };
};

export const useFilterReset = () => {
  const { state, dispatch } = useContext(NadeFilterContext);

  const resetFilter = useCallback(() => {
    dispatch({
      type: "@@nadefilter/RESET_NADE_FILTER",
    });
  }, [dispatch]);

  const canReset = useMemo(() => {
    if (state.byCoords) {
      return true;
    }
    if (state.byFavorites) {
      return true;
    }
    if (state.byTickrate !== "any") {
      return true;
    }
    if (state.byType) {
      return true;
    }
    return false;
  }, [state]);

  return {
    resetFilter,
    canReset,
  };
};

export const useFilteredNades = () => {
  const { state } = useContext(NadeFilterContext);
  const favoritedNades = useSelector(favoritedNadeIdsSelector);
  const { byTickrate, nades, byType, byCoords } = state;

  const filteredNades = useMemo(() => {
    let thenades = nades;

    thenades = filterByCoords(thenades, byCoords);
    thenades = addFavoriteToNades(thenades, favoritedNades);
    thenades = filterByType(thenades, byType);
    thenades = filterByTickrate(thenades, byTickrate);

    return thenades;
  }, [byTickrate, nades, byType, favoritedNades, byCoords]);

  return filteredNades;
};

export const useNadesForMapView = (): NadeLight[] => {
  const { state } = useContext(NadeFilterContext);
  const { nades, byType, byTickrate } = state;

  const unqiueNadesForPosition = useMemo(() => {
    const unqiueNades: NadeLight[] = [];

    if (!nades) {
      return unqiueNades;
    }

    let filteredNades = [...nades];

    filteredNades = filterByType(filteredNades, byType);
    filteredNades = filterByTickrate(filteredNades, byTickrate);

    for (const nade of filteredNades) {
      if (nade.mapEndCoord && nade.type) {
        if (!containsSimilarNade(nade, unqiueNades)) {
          unqiueNades.push(nade);
        }
      }
    }

    return unqiueNades;
  }, [nades, byType, byTickrate]);

  return unqiueNadesForPosition;
};

function filterByType(nades: NadeLight[], byType?: NadeType): NadeLight[] {
  if (byType) {
    return nades.filter(n => n.type === byType);
  } else {
    return nades;
  }
}

function filterByTickrate(
  nades: NadeLight[],
  byTickrate: Tickrate
): NadeLight[] {
  if (byTickrate === "tick128") {
    return nades.filter(n => n.tickrate !== "tick64");
  } else if (byTickrate === "tick64") {
    return nades.filter(n => n.tickrate !== "tick128");
  } else {
    return nades;
  }
}

function filterByCoords(nades: NadeLight[], coords?: MapCoordinates) {
  if (!coords) {
    return nades;
  }

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

function containsSimilarNade(nade: NadeLight, nades: NadeLight[]): boolean {
  const containsSimilar = nades.find(n => {
    if (!n.mapEndCoord || !n.type || !nade.mapEndCoord || !nade.type) {
      return false;
    }

    if (nade.type !== n.type) {
      return false;
    }

    const dist = Math.sqrt(
      Math.pow(n.mapEndCoord.x - nade.mapEndCoord.x, 2) +
        Math.pow(n.mapEndCoord.y - nade.mapEndCoord.y, 2)
    );

    if (dist < 20) {
      return true;
    } else {
      return false;
    }
  });

  return !!containsSimilar;
}
