import { tokenSelector } from "../AuthStore/AuthSelectors";
import { NadeApi } from "../../api/NadeApi";
import {
  ReduxThunkAction,
  useReduxDispatch
} from "../StoreUtils/ThunkActionType";
import { addNotificationAction } from "../NotificationStore/NotificationActions";
import {
  NadeUpdateBody,
  NadeLight,
  NadeStatusDTO,
  Nade
} from "../../models/Nade";
import { Dispatch } from "redux";

type AddNadesAction = {
  type: "@@nades/add";
  nades: NadeLight[];
};

type AddSelectedNadeAction = {
  type: "@@nades/add_selected";
  nade: Nade;
};

type StartLoadingNadeAction = {
  type: "@@nades/START_LOADING";
};

type StopLoadingNadeAction = {
  type: "@@nades/STOP_LOADING";
};

export type NadeActions =
  | AddNadesAction
  | AddSelectedNadeAction
  | StartLoadingNadeAction
  | StopLoadingNadeAction;

export const addNadeAction = (nades: NadeLight[], dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/add",
    nades
  });
};

export const addSelectedNadeAction = (nade: Nade, dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/add_selected",
    nade
  });
};

export const startLoadingNadeAction = (dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/START_LOADING"
  });
};

export const stopLoadingNadeAction = (dispatch: Dispatch) => {
  dispatch({
    type: "@@nades/STOP_LOADING"
  });
};

export const useUpdateNadeStatus = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string, updates: NadeStatusDTO) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const authToken = tokenSelector(getState());
      if (!authToken) {
        return addNotificationAction(dispatch, {
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        });
      }

      const result = await NadeApi.updateNadeStatus(nadeId, updates, authToken);

      if (result.isErr()) {
        return addNotificationAction(dispatch, {
          message: "Failed to update nade.",
          severity: "error"
        });
      }

      addSelectedNadeAction(result.value, dispatch);
    };
    reduxDispatch(thunk);
  };
};

export const useUpdateUser = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string, steamId: string) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const authToken = tokenSelector(getState());
      if (!authToken) {
        return addNotificationAction(dispatch, {
          message: "Can't update, seems like your not signed in.",
          severity: "error"
        });
      }

      const result = await NadeApi.updateUser(nadeId, steamId, authToken);

      if (result.isErr()) {
        return addNotificationAction(dispatch, {
          message: "Failed to update user.",
          severity: "error"
        });
      }

      addSelectedNadeAction(result.value, dispatch);
    };
    reduxDispatch(thunk);
  };
};

export const useUpdateNadeAction = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string, data: NadeUpdateBody) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const authToken = tokenSelector(getState());

      if (!authToken) {
        return;
      }

      const result = await NadeApi.update(nadeId, data, authToken);

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
