import {
  Nade,
  NadeBody,
  NadeUpdateBody,
  NadeStatusDTO
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
import { nadeFilterSelector } from "./NadeSelectors";
import { NadeType } from "../../models/Nade/NadeType";

export const useNadeFilter = () => {
  const dispatch = useDispatch();
  const nadeFilter = useSelector(nadeFilterSelector);

  function filterByType(nadeType: NadeType, map: CsgoMap) {
    dispatch(filterByNadeTypeThunk(map, nadeType));
  }

  return {
    nadeFilter,
    filterByType
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
