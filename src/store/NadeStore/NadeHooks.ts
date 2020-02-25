import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NadeApi } from "../../api/NadeApi";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import {
  Nade,
  NadeBody,
  NadeLight,
  NadeStatusDTO,
  NadeUpdateBody,
} from "../../models/Nade/Nade";
import { userSelector } from "../AuthStore/AuthSelectors";
import { favoritedNadeIdsSelector } from "../FavoriteStore/FavoriteSelectors";
import { useNadeSorter } from "../NadeFilterStore/NadeFilterHooks";
import {
  nadeForMapLastUpdateSelector,
  nadesForMapSelector,
} from "./NadeSelectors";
import {
  createNadeAction,
  deleteNadeAction,
  fetchNadesByMapActionThunk,
  updateNadeAction,
  updateNadeGfycatAction,
  updateNadeStatusAction,
  updateNadeUserAction,
} from "./NadeThunks";

export const useCanEditNade = (nade: Nade): boolean => {
  const user = useSelector(userSelector);

  const canEdit = useMemo(() => {
    if (!user) {
      return false;
    } else if (user.role === "administrator" || user.role === "moderator") {
      return true;
    } else if (user.steamId === nade.steamId) {
      return true;
    } else {
      return false;
    }
  }, [user, nade.steamId]);

  return canEdit;
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
  const nadeFilter = useNadeSorter();
  const favoritedNades = useSelector(favoritedNadeIdsSelector);

  const nades = useMemo(() => {
    if (!nadesForMap) {
      return [];
    }

    const nadesWithFavs = nadesForMap.map(n => {
      if (favoritedNades.includes(n.id)) {
        return {
          ...n,
          isFavorited: true,
        };
      } else {
        return n;
      }
    });

    nadesWithFavs.sort((a, b) => {
      return b.score - a.score;
    });

    return nadeFilter(nadesWithFavs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nadesForMap, nadesAddedAt, nadeFilter, favoritedNades]);

  return {
    nades,
  };
};

export const useNadeCoordinatesForMap = (map: CsgoMap): NadeLight[] => {
  const nades = useSelector(nadesForMapSelector(map));
  const nadeSorter = useNadeSorter(true);

  const unqiueNadesForPosition = useMemo(() => {
    const unqiueNades: NadeLight[] = [];

    if (!nades) {
      return unqiueNades;
    }

    const filteredNades = nadeSorter(nades);

    for (const nade of filteredNades) {
      if (nade.mapEndCoord && nade.type) {
        if (!containsSimilarNade(nade, unqiueNades)) {
          unqiueNades.push(nade);
        }
      }
    }

    return unqiueNades;
  }, [nades, nadeSorter]);

  return unqiueNadesForPosition;
};

export const useSimilarNades = (nade: Nade) => {
  const dispatch = useDispatch();
  const nadesForMap = useSelector(nadesForMapSelector(nade.map));

  useEffect(() => {
    if (!nadesForMap && nade.map) {
      dispatch(fetchNadesByMapActionThunk(nade.map));
    }
  }, [nadesForMap, nade, dispatch]);

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

export const useRegisterView = () => {
  const user = useSelector(userSelector);

  const registerNadeView = useCallback(
    (nadeId: string) => {
      if (user?.role === "administrator") {
        return;
      }
      NadeApi.registerView(nadeId);
    },
    [user]
  );

  return registerNadeView;
};

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
