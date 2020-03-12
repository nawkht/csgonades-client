import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NadeApi } from "../../api/NadeApi";
import { Nade, NadeStatusDTO, NadeUpdateBody } from "../../models/Nade/Nade";
import { userSelector } from "../AuthStore/AuthSelectors";
import { nadesForMapSelector } from "./NadeSelectors";
import {
  deleteNadeAction,
  fetchNadesByMapActionThunk,
  updateNadeAction,
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
