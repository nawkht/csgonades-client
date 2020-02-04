import moment from "moment";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import {
  MapCoordinates,
  Nade,
  NadeBody,
  NadeLight,
  NadeStatusDTO,
  NadeUpdateBody
} from "../../models/Nade/Nade";
import { NadeType } from "../../models/Nade/NadeType";
import { useIsAdmin } from "../AuthStore/AuthHooks";
import { userSelector } from "../AuthStore/AuthSelectors";
import { favoritedNadeIdsSelector } from "../FavoriteStore/FavoriteSelectors";
import {
  filterByMapCoordsAction,
  filterByTypeAction,
  resetNadeFilterAction,
  setSortingMethodAction,
  SortingMethod,
  toggleFilterByFavoritesAction,
  toggleMapPositionModalAction
} from "./NadeActions";
import { NadeFilters } from "./NadeReducer";
import {
  filterForMapSelector,
  nadeForMapLastUpdateSelector,
  nadesForMapSelector,
  postionModalOpenSelector
} from "./NadeSelectors";
import {
  createNadeAction,
  deleteNadeAction,
  fetchNadesByMapActionThunk,
  updateNadeAction,
  updateNadeGfycatAction,
  updateNadeStatusAction,
  updateNadeUserAction
} from "./NadeThunks";

export const useNadeFilter = (map: CsgoMap) => {
  const isAdmin = useIsAdmin();
  const dispatch = useDispatch();
  const nadeFilter = useSelector(filterForMapSelector(map));
  const { sortingMethod, coords, favorites } = nadeFilter;
  const postionModalOpen = useSelector(postionModalOpenSelector);

  const canReset = useMemo(() => {
    const hasCoords = !coords;
    const isSortingByDate = sortingMethod === "score";
    const isShowingFavorites = favorites;
    const isDefaultTypeFilter =
      !nadeFilter.flash &&
      !nadeFilter.hegrenade &&
      !nadeFilter.molotov &&
      !nadeFilter.smoke;

    if (
      !isDefaultTypeFilter ||
      !hasCoords ||
      !isSortingByDate ||
      isShowingFavorites
    ) {
      return true;
    } else {
      return false;
    }
  }, [coords, sortingMethod, nadeFilter]);

  function filterByType(nadeType: NadeType) {
    dispatch(filterByTypeAction(nadeType, map));
  }

  function reset() {
    dispatch(resetNadeFilterAction(map));
  }

  function setSortingMethod(method: SortingMethod) {
    dispatch(setSortingMethodAction(method, map));
  }

  function filterByMapCoords(coords: MapCoordinates) {
    dispatch(filterByMapCoordsAction(coords, map));
  }

  function toggleFilterByFavorites() {
    dispatch(toggleFilterByFavoritesAction(map));
  }

  const toggleMapPositionModal = useCallback(
    (visible: boolean) => {
      dispatch(toggleMapPositionModalAction(visible));
    },
    [dispatch]
  );

  return {
    nadeFilter,
    filterByType,
    canReset,
    reset,
    setSortingMethod,
    sortingMethod,
    filterByMapCoords,
    coords,
    toggleMapPositionModal,
    postionModalOpen,
    toggleFilterByFavorites,
    isShowingFavorites: favorites
  };
};

export const useCanEditNade = (nade: Nade): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  } else if (user.role === "administrator" || user.role === "moderator") {
    return true;
  } else if (user.steamId === nade.steamId) {
    return true;
  } else {
    return false;
  }
};

export const useCreateNade = () => {
  const dispatch = useDispatch();
  return (nadeBody: NadeBody) => dispatch(createNadeAction(nadeBody));
};

export const useUpdateGfycat = () => {
  const dispatch = useDispatch();
  return (nadeId: string, newGfyId: string) =>
    dispatch(updateNadeGfycatAction(nadeId, newGfyId));
};

export const useFetchNadesByMap = () => {
  const dispatch = useDispatch();
  return (mapName: CsgoMap) => dispatch(fetchNadesByMapActionThunk(mapName));
};

export const useDeleteNade = () => {
  const dispatch = useDispatch();
  return (nadeId: string) => dispatch(deleteNadeAction(nadeId));
};

export const useUpdateUser = () => {
  const dispatch = useDispatch();
  return (nadeId: string, steamId: string) =>
    dispatch(updateNadeUserAction(nadeId, steamId));
};

export const useUpdateNade = () => {
  const dispatch = useDispatch();
  return (nadeId: string, data: NadeUpdateBody) =>
    dispatch(updateNadeAction(nadeId, data));
};

export const useUpdateNadeStatus = () => {
  const dispatch = useDispatch();
  return (nadeId: string, updates: NadeStatusDTO) =>
    dispatch(updateNadeStatusAction(nadeId, updates));
};

export const useNadesForMap = (map: CsgoMap) => {
  const nadesAddedAt = useSelector(nadeForMapLastUpdateSelector(map));
  const nadesForMap = useSelector(nadesForMapSelector(map));
  const favoritedNadeIds = useSelector(favoritedNadeIdsSelector);
  const nadeFilter = useSelector(filterForMapSelector(map));

  const nades = useMemo(() => {
    if (!nadesForMap) {
      return [];
    }
    return filterNades(nadesForMap, nadeFilter, favoritedNadeIds);
  }, [map, nadesForMap, nadeFilter, favoritedNadeIds, nadesAddedAt]);

  return {
    nades
  };
};

type Coord = {
  key: string;
  x: number;
  y: number;
};

export const useNadeCoordinatesForMap = (map: CsgoMap): NadeLight[] => {
  const nades = useSelector(nadesForMapSelector(map));
  const nadeFilter = useSelector(filterForMapSelector(map));

  const unqiueNadesForPosition = useMemo(() => {
    const unqiueNades: NadeLight[] = [];

    if (!nades) {
      return unqiueNades;
    }

    const unique: any = {};

    for (let nade of nades) {
      if (nade.mapEndCoord && nade.type) {
        const { x, y } = nade.mapEndCoord;
        const roundedX = Math.ceil(x / 30) * 30;
        const roundedY = Math.ceil(y / 30) * 30;
        const coordKey = `${nade.type}(${roundedX},${roundedY})`;

        if (!unique[coordKey]) {
          unqiueNades.push(nade);
          unique[coordKey] = true;
        }
      }
    }

    return filterForMapView(unqiueNades, nadeFilter);
  }, [nades, nadeFilter]);

  return unqiueNadesForPosition;
};

export const useRawNadesForMap = (map: CsgoMap) => {
  const nades = useSelector(nadesForMapSelector(map));

  if (!nades) {
    return {
      nades: []
    };
  }

  return {
    nades
  };
};

function sortNades(method: SortingMethod, nades: NadeLight[]) {
  const nadeCopy = [...nades];
  switch (method) {
    case "name":
      nadeCopy.sort((a, b) => {
        return (a.title || "").localeCompare(b.title || "");
      });
      return nadeCopy;
    case "score": {
      nadeCopy.sort((a, b) => b.score - a.score);
      return nadeCopy;
    }
    default:
      nadeCopy.sort((a, b) => {
        return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf();
      });
      return nadeCopy;
  }
}

function applyNadeFilter(nadeFilter: NadeFilters, nades: NadeLight[]) {
  if (nadeFilter.flash) {
    return nades.filter(n => n.type === "flash");
  } else if (nadeFilter.smoke) {
    return nades.filter(n => n.type === "smoke");
  } else if (nadeFilter.molotov) {
    return nades.filter(n => n.type === "molotov");
  } else if (nadeFilter.hegrenade) {
    return nades.filter(n => n.type === "hegrenade");
  } else {
    return nades;
  }
}

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

export const useSimilarNades = (nade: Nade) => {
  const dispatch = useDispatch();
  const nadesForMap = useSelector(nadesForMapSelector(nade.map));

  useEffect(() => {
    if (!nadesForMap && nade.map) {
      dispatch(fetchNadesByMapActionThunk(nade.map));
    }
  }, [nadesForMap, nade]);

  if (!nade.map || !nade.type || !nade.mapEndCoord || !nadesForMap) {
    return [];
  }

  const nadesWithSameType = nadesForMap.filter(n => n.type === nade.type);

  const MIN_DISTANCE = 20;

  const { x, y } = nade.mapEndCoord;

  const similarNades = nadesWithSameType.filter(n => {
    if (n.id === nade.id) {
      return false;
    }
    if (!n.mapEndCoord) {
      return false;
    }
    const dist = Math.sqrt(
      Math.pow(n.mapEndCoord.x - x, 2) + Math.pow(n.mapEndCoord.y - y, 2)
    );

    if (dist < MIN_DISTANCE) {
      return true;
    }
  });

  return similarNades;
};

function filterNades(
  nades: NadeLight[],
  nadeFilter: NadeFilters,
  favoritedNadeIds: string[]
) {
  let processedNades: NadeLight[];

  processedNades = nades.map(n => {
    const favorited = favoritedNadeIds.includes(n.id);
    return {
      ...n,
      isFavorited: favorited
    };
  });

  processedNades = sortNades(nadeFilter.sortingMethod, processedNades);
  processedNades = applyNadeFilter(nadeFilter, processedNades);

  if (nadeFilter.coords) {
    processedNades = nadesForCoords(processedNades, nadeFilter.coords);
  }

  if (nadeFilter.favorites) {
    processedNades = processedNades.filter(n => n.isFavorited);
  }

  return processedNades;
}

function filterForMapView(nades: NadeLight[], nadeFilter: NadeFilters) {
  let processedNades: NadeLight[] = nades;

  processedNades = applyNadeFilter(nadeFilter, processedNades);

  return processedNades;
}
