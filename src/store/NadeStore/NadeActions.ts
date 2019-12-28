import { tokenSelector } from "../AuthStore/AuthSelectors";
import { NadeApi, NadeFilterOptions } from "../../api/NadeApi";
import {
  ReduxThunkAction,
  useReduxDispatch
} from "../StoreUtils/ThunkActionType";
import { addNotificationAction } from "../NotificationStore/NotificationActions";
import {
  NadeUpdateBody,
  NadeLight,
  CsgoMap,
  NadeStatusDTO,
  Nade
} from "../../models/Nade";

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

export type NadeActions = AddNadesAction | AddSelectedNadeAction;

export const addNadeAction = (nades: NadeLight[]): AddNadesAction => {
  return {
    type: "@@nades/add",
    nades
  };
};

export const addSelectedNadeAction = (nade: Nade): AddSelectedNadeAction => ({
  type: "@@nades/add_selected",
  nade
});

export const startLoadingNadeAction = (): StartLoadingNadeAction => ({
  type: "@@nades/START_LOADING"
});

export const stopLoadingNadeAction = (): StopLoadingNadeAction => ({
  type: "@@nades/STOP_LOADING"
});

export const useFetchSelectedNade = (nadeId: string) => {
  const reduxDispatch = useReduxDispatch();
  return () => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const nade = await NadeApi.byId(nadeId);

      if (nade) {
        dispatch(addSelectedNadeAction(nade));
      }
    };
    reduxDispatch(thunk);
  };
};

export const useFetchNades = (mapName: CsgoMap) => {
  const reduxDispatch = useReduxDispatch();
  return (filter?: NadeFilterOptions) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const result = await NadeApi.getByMap(mapName, filter);
      dispatch(addNadeAction(result));
    };
    reduxDispatch(thunk);
  };
};

export const useUpdateNadeStatus = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string, updates: NadeStatusDTO) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const { token } = getState().auth;
      const updatedNade = await NadeApi.updateNadeStatus(
        nadeId,
        updates,
        token
      );

      if (updatedNade) {
        dispatch(addSelectedNadeAction(updatedNade));
      }
    };
    reduxDispatch(thunk);
  };
};

export const useUpdateUser = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string, steamId: string) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const { token } = getState().auth;
      const updatedUser = await NadeApi.updateUser(nadeId, steamId, token);

      if (updatedUser) {
        dispatch(addSelectedNadeAction(updatedUser));
      }
    };
    reduxDispatch(thunk);
  };
};

export const useUpdateNadeAction = () => {
  const reduxDispatch = useReduxDispatch();
  return (nadeId: string, data: NadeUpdateBody) => {
    const thunk: ReduxThunkAction = async (dispatch, getState) => {
      const authToken = tokenSelector(getState());
      const updatedNade = await NadeApi.update(nadeId, data, authToken);

      if (!updatedNade) {
        return addNotificationAction(dispatch, {
          message: "Failed to update nade.",
          severity: "error"
        });
      }

      dispatch(addSelectedNadeAction(updatedNade));

      addNotificationAction(dispatch, {
        message: "Updated nade details!",
        severity: "success"
      });
    };
    reduxDispatch(thunk);
  };
};
