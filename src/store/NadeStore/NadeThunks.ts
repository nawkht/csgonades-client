import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { NadeApi, NadeFilterOptions } from "../../api/NadeApi";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import {
  addNadeAction,
  startLoadingNadeAction,
  stopLoadingNadeAction,
  addSelectedNadeAction
} from "./NadeActions";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import {
  NadeUpdateBody,
  NadeBody,
  NadeStatusDTO
} from "../../models/Nade/Nade";
import { redirectNadePage } from "../../utils/Common";
import Router from "next/router";
import { addNotificationActionThunk } from "../NotificationStore/NotificationThunks";
import { nadeFilterSelector } from "./NadeSelectors";

export const fetchNadesByMapAction = (mapName: CsgoMap): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const filter = nadeFilterSelector(getState());

    startLoadingNadeAction(dispatch);
    const nadesResult = await NadeApi.getByMap(mapName, filter);
    stopLoadingNadeAction(dispatch);

    if (nadesResult.isErr()) {
      console.error(nadesResult.error);
      return;
    }

    const nades = nadesResult.value;

    return dispatch(addNadeAction(nades));
  };
};

export const fetchNadeByIdAction = (nadeId: string): ReduxThunkAction => {
  return async dispatch => {
    startLoadingNadeAction(dispatch);
    const result = await NadeApi.byId(nadeId);
    stopLoadingNadeAction(dispatch);

    if (result.isErr()) {
      return dispatch(
        addNotificationActionThunk({
          message: "Failed to fetch nades.",
          severity: "error"
        })
      );
    }

    return addSelectedNadeAction(result.value, dispatch);
  };
};

export const createNadeAction = (nadeBody: NadeBody): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const { token } = getState().authStore;
    if (!token) {
      console.warn("useCreateNade no token");
      return;
    }

    startLoadingNadeAction(dispatch);
    const result = await NadeApi.save(nadeBody, token);
    stopLoadingNadeAction(dispatch);

    if (result.isErr()) {
      console.error(result.error);
      return dispatch(
        addNotificationActionThunk({
          message: result.error.message,
          severity: "error"
        })
      );
    }

    redirectNadePage(result.value.id);
  };
};

export const updateNadeAction = (
  nadeId: string,
  data: NadeUpdateBody
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());

    if (!authToken) {
      return;
    }

    startLoadingNadeAction(dispatch);
    const result = await NadeApi.update(nadeId, data, authToken);
    stopLoadingNadeAction(dispatch);

    if (result.isErr()) {
      return dispatch(
        addNotificationActionThunk({
          message: "Failed to update nade.",
          severity: "error"
        })
      );
    }

    addSelectedNadeAction(result.value, dispatch);

    dispatch(
      addNotificationActionThunk({
        message: "Updated nade details!",
        severity: "success"
      })
    );
  };
};

export const updateNadeGfycatAction = (
  nadeId: string,
  newGfyId: string
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        })
      );
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
      return dispatch(
        addNotificationActionThunk({
          message: "Failed to update nade.",
          severity: "error"
        })
      );
    }

    addSelectedNadeAction(result.value, dispatch);

    dispatch(
      addNotificationActionThunk({
        message: "Updated nade details!",
        severity: "success"
      })
    );
  };
};

export const deleteNadeAction = (nadeId: string): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        })
      );
    }

    startLoadingNadeAction(dispatch);
    const result = await NadeApi.delete(nadeId, authToken);
    stopLoadingNadeAction(dispatch);

    if (result.isErr()) {
      return dispatch(
        addNotificationActionThunk({
          message: "Failed to delete nade.",
          severity: "error"
        })
      );
    }

    Router.push("/", "/");
  };
};

export const updateNadeUserAction = (
  nadeId: string,
  steamId: string
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        })
      );
    }

    startLoadingNadeAction(dispatch);
    const result = await NadeApi.updateUser(nadeId, steamId, authToken);
    stopLoadingNadeAction(dispatch);

    if (result.isErr()) {
      return dispatch(
        addNotificationActionThunk({
          message: "Failed to update user.",
          severity: "error"
        })
      );
    }

    addSelectedNadeAction(result.value, dispatch);
  };
};

export const updateNadeStatusAction = (
  nadeId: string,
  updates: NadeStatusDTO
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        })
      );
    }

    startLoadingNadeAction(dispatch);
    const result = await NadeApi.updateNadeStatus(nadeId, updates, authToken);
    stopLoadingNadeAction(dispatch);

    if (result.isErr()) {
      return dispatch(
        addNotificationActionThunk({
          message: "Failed to update nade.",
          severity: "error"
        })
      );
    }

    addSelectedNadeAction(result.value, dispatch);
  };
};
