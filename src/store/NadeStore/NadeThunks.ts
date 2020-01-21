import moment from "moment";
import Router from "next/router";
import { NadeApi } from "../../api/NadeApi";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import {
  NadeBody,
  NadeStatusDTO,
  NadeUpdateBody
} from "../../models/Nade/Nade";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { addNotificationActionThunk } from "../ToastStore/ToastThunks";
import {
  addNadeError,
  addNadesForMapAction,
  addRecentNadesAction,
  addSelectedNadeAction,
  startLoadingNadeAction
} from "./NadeActions";
import { nadesForMapTimeSinceFetchSelector } from "./NadeSelectors";

export const fetchNewestNadesAction = (limit?: number): ReduxThunkAction => {
  return async dispatch => {
    const nadesResult = await NadeApi.getAll();

    if (nadesResult.isErr()) {
      console.error(nadesResult.error);
      return;
    }

    const nades = nadesResult.value;

    return dispatch(addRecentNadesAction(nades));
  };
};

export const fetchNadesByMapActionThunk = (
  mapName?: CsgoMap,
  noCache?: boolean
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    if (!mapName) {
      return;
    }

    const state = getState();

    const timeSinceFetch = nadesForMapTimeSinceFetchSelector(mapName)(state);

    const MAP_NADES_TTL_MINS = 15;
    // Don't refetch if allready fetched
    if (!noCache && timeSinceFetch) {
      const minutesSinceFetch = moment().diff(
        moment(timeSinceFetch),
        "minutes",
        false
      );

      if (minutesSinceFetch < MAP_NADES_TTL_MINS) {
        return;
      }
    }

    startLoadingNadeAction(dispatch);

    const nadesResult = await NadeApi.getByMap(mapName);

    if (nadesResult.isErr()) {
      console.error(nadesResult.error);
      return;
    }

    const nades = nadesResult.value;

    return dispatch(addNadesForMapAction(mapName, nades));
  };
};

export const fetchNadeByIdAction = (nadeId: string): ReduxThunkAction => {
  return async dispatch => {
    const result = await NadeApi.byId(nadeId);

    if (result.isErr()) {
      dispatch(addNadeError(result.error));
      return;
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

    const result = await NadeApi.save(nadeBody, token);

    if (result.isErr()) {
      console.error(result.error);
      return dispatch(
        addNotificationActionThunk({
          message: result.error.message,
          severity: "error"
        })
      );
    }
  };
};

export const updateNadeAction = (
  nadeId: string,
  data: NadeUpdateBody
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());

    if (!authToken) {
      console.error("Missing token");
      return;
    }

    const result = await NadeApi.update(nadeId, data, authToken);

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

    const result = await NadeApi.update(
      nadeId,
      {
        gfycatIdOrUrl: newGfyId
      },
      authToken
    );

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

    const result = await NadeApi.delete(nadeId, authToken);

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

    const result = await NadeApi.updateUser(nadeId, steamId, authToken);

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

    const result = await NadeApi.updateNadeStatus(nadeId, updates, authToken);

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
