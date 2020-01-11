import {
  Nade,
  NadeBody,
  NadeUpdateBody,
  NadeStatusDTO,
  NadeLight,
  MapCoordinates
} from "../../models/Nade/Nade";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../AuthStore/AuthSelectors";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import {
  fetchNadesByMapActionThunk,
  createNadeAction,
  updateNadeGfycatAction,
  deleteNadeAction,
  updateNadeUserAction,
  updateNadeAction,
  updateNadeStatusAction,
  filterByNadeTypeThunk
} from "./NadeThunks";
import {
  nadeFilterSelector,
  sortingMethodSelector,
  nadesForMapSelector,
  mapFilterCoordinateSelector
} from "./NadeSelectors";
import { NadeType } from "../../models/Nade/NadeType";
import {
  SortingMethod,
  setSortingMethodAction,
  filterByMapCoordsAction,
  resetNadeFilterAction
} from "./NadeActions";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { useMemo } from "react";
import moment from "moment";
import { NadeFilters } from "./NadeReducer";

export const useNadeFilter = () => {
  const dispatch = useDispatch();
  const nadeFilter = useSelector(nadeFilterSelector);
  const sortingMethod = useSelector(sortingMethodSelector);
  const coords = useSelector(mapFilterCoordinateSelector);

  const canReset = useMemo(() => {
    const hasCoords = !coords;
    const isSortingByDate = sortingMethod === "date";
    const isDefaultTypeFilter =
      !nadeFilter.flash &&
      !nadeFilter.hegrenade &&
      !nadeFilter.molotov &&
      !nadeFilter.smoke;

    if (!isDefaultTypeFilter || !hasCoords || !isSortingByDate) {
      return true;
    } else {
      return false;
    }
  }, [coords, sortingMethod, nadeFilter]);

  function filterByType(nadeType: NadeType) {
    dispatch(filterByNadeTypeThunk(nadeType));
  }

  function reset() {
    dispatch(resetNadeFilterAction());
  }

  function setSortingMethod(method: SortingMethod) {
    GoogleAnalytics.event("Nade filter", `Sort by ${method}`);
    dispatch(setSortingMethodAction(method));
  }

  function filterByMapCoords(coords: MapCoordinates) {
    dispatch(filterByMapCoordsAction(coords));
  }

  return {
    nadeFilter,
    filterByType,
    canReset,
    reset,
    setSortingMethod,
    sortingMethod,
    filterByMapCoords,
    coords
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
  const nadesForMap = useSelector(nadesForMapSelector(map));
  const nadeFilter = useSelector(nadeFilterSelector);

  const nades = useMemo(() => {
    if (!nadesForMap) {
      return [];
    }
    let processedNades;

    processedNades = sortNades(nadeFilter.sorthingMethod, nadesForMap);
    processedNades = applyNadeFilter(nadeFilter, processedNades);

    if (nadeFilter.coords) {
      processedNades = nadesForCoords(processedNades, nadeFilter.coords);
    }

    return processedNades;
  }, [map, nadesForMap, nadeFilter]);

  return {
    nades
  };
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
