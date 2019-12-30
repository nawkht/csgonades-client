import { Nade, NadeBody } from "../../models/Nade/Nade";
import { useSelector } from "react-redux";
import { userSelector, tokenSelector } from "../AuthStore/AuthSelectors";
import {
  useReduxDispatch,
  ReduxThunkAction
} from "../StoreUtils/ThunkActionType";
import { NadeApi, NadeFilterOptions } from "../../api/NadeApi";
import Router from "next/router";
import {
  startLoadingNadeAction,
  stopLoadingNadeAction,
  addSelectedNadeAction,
  addNadeAction
} from "./NadeActions";
import { addNotificationAction } from "../NotificationStore/NotificationActions";
import { redirectNadePage } from "../../utils/Common";
import { CsgoMap } from "../../models/Nade/CsGoMap";

export const useCanEditNade = (nade: Nade): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }

  if (user.role === "administrator" || user.role === "moderator") {
    return true;
  }

  if (user.steamID === nade.steamId) {
    return true;
  }

  return false;
};

export const useCreateNade = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeBody: NadeBody) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const { token } = getState().auth;
      if (!token) {
        console.warn("useCreateNade no token");
        return;
      }

      startLoadingNadeAction(dispatch);
      const result = await NadeApi.save(nadeBody, token);
      stopLoadingNadeAction(dispatch);

      if (result.isErr()) {
        console.error(result.error);
        return addNotificationAction(dispatch, {
          message: result.error.message,
          severity: "error"
        });
      }

      redirectNadePage(result.value.id);
    };
    reduxDispatch(thunk);
  };
};

export const useUpdateGfycat = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string, newGfyId: string) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const authToken = tokenSelector(getState());
      if (!authToken) {
        return addNotificationAction(dispatch, {
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        });
      }

      startLoadingNadeAction(dispatch);
      const result = await NadeApi.update(
        nadeId,
        {
          gfycatIdOrUrl: newGfyId
        },
        authToken
      );
      stopLoadingNadeAction(dispatch);

      if (result.isErr()) {
        return addNotificationAction(dispatch, {
          message: "Failed to update nade.",
          severity: "error"
        });
      }

      addSelectedNadeAction(result.value, dispatch);

      addNotificationAction(dispatch, {
        message: "Updated nade details!",
        severity: "success"
      });
    };
    reduxDispatch(thunk);
  };
};

export const useFetchSelectedNade = (nadeId: string) => {
  const reduxDispatch = useReduxDispatch();
  return () => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      startLoadingNadeAction(dispatch);
      const result = await NadeApi.byId(nadeId);
      stopLoadingNadeAction(dispatch);

      if (result.isErr()) {
        return addNotificationAction(dispatch, {
          message: "Failed to fetch nades.",
          severity: "error"
        });
      }

      addSelectedNadeAction(result.value, dispatch);
    };
    reduxDispatch(thunk);
  };
};

export const useFetchNades = (mapName: CsgoMap) => {
  const reduxDispatch = useReduxDispatch();
  return (filter?: NadeFilterOptions) => {
    const thunk: ReduxThunkAction = async dispatch => {
      startLoadingNadeAction(dispatch);
      const result = await NadeApi.getByMap(mapName, filter);
      stopLoadingNadeAction(dispatch);

      if (result.isErr()) {
        return addNotificationAction(dispatch, {
          message: "Failed to fetch nades.",
          severity: "error"
        });
      }

      addNadeAction(result.value, dispatch);
    };
    reduxDispatch(thunk);
  };
};

export const useForceNadeYear = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string, year: string) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const authToken = tokenSelector(getState());
      if (!authToken) {
        return addNotificationAction(dispatch, {
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        });
      }

      if (year.length !== 4) {
        return addNotificationAction(dispatch, {
          message: "Year must be 4 chars long",
          severity: "error"
        });
      }

      const result = await NadeApi.forceYear(nadeId, year, authToken);

      if (result.isErr()) {
        return addNotificationAction(dispatch, {
          message: "Failed to update nade year.",
          severity: "error"
        });
      }

      addSelectedNadeAction(result.value, dispatch);
    };
    reduxDispatch(thunk);
  };
};

export const useDeleteNade = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const authToken = tokenSelector(getState());
      if (!authToken) {
        return addNotificationAction(dispatch, {
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        });
      }

      startLoadingNadeAction(dispatch);
      const result = await NadeApi.delete(nadeId, authToken);
      stopLoadingNadeAction(dispatch);

      if (result.isErr()) {
        return addNotificationAction(dispatch, {
          message: "Failed to delete nade.",
          severity: "error"
        });
      }

      Router.push("/", "/");
    };
    reduxDispatch(thunk);
  };
};
