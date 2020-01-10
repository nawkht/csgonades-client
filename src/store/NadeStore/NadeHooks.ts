import {
  Nade,
  NadeBody,
  NadeUpdateBody,
  NadeStatusDTO,
  NadeLight
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
  nadesSelector,
  nadesForMapSelector
} from "./NadeSelectors";
import { NadeType } from "../../models/Nade/NadeType";
import { SortingMethod, setSortingMethodAction } from "./NadeActions";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { useMemo } from "react";
import moment from "moment";
import { NadeFilters } from "./NadeReducer";

export const useNadeFilter = () => {
  const dispatch = useDispatch();
  const nadeFilter = useSelector(nadeFilterSelector);

  function filterByType(nadeType: NadeType) {
    dispatch(filterByNadeTypeThunk(nadeType));
  }

  return {
    nadeFilter,
    filterByType
  };
};

export const useSortingMethod = () => {
  const dispatch = useDispatch();
  const sortingMethod = useSelector(sortingMethodSelector);

  const setSortingMethod = (method: SortingMethod) => {
    GoogleAnalytics.event("Nade filter", `Sort by ${method}`);
    dispatch(setSortingMethodAction(method));
  };
  return {
    sortingMethod,
    setSortingMethod
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

    const sorted = sortNades(nadeFilter.sorthingMethod, nadesForMap);
    const filtered = applyNadeFilter(nadeFilter, sorted);

    return filtered;
  }, [map, nadesForMap, nadeFilter]);

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
