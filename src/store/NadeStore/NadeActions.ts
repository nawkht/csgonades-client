import { tokenSelector } from "../AuthStore/AuthSelectors";
import { NadeApi, NadeFilterOptions } from "../../api/NadeApi";
import {
  ReduxDispatch,
  ReduxThunkAction,
  useReduxDispatch
} from "../StoreUtils/ThunkActionType";
import { addNotificationAction } from "../NotificationStore/NotificationActions";
import { NadeUpdateBody, NadeLight, CsgoMap } from "../../models/Nade";

type AddNadesAction = {
  type: "@@nades/add";
  nades: NadeLight[];
};
export type NadeActions = AddNadesAction;

export const addNadeAction = (nades: NadeLight[]): AddNadesAction => {
  return {
    type: "@@nades/add",
    nades
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

export const updateNadeAction = (
  reduxDispatch: ReduxDispatch<any>,
  nadeId: string,
  data: NadeUpdateBody
) => {
  const thunk: ReduxThunkAction = async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    const success = await NadeApi.update(nadeId, data, authToken);

    if (success) {
      addNotificationAction(dispatch, {
        message: "Updated nade details!",
        severity: "success"
      });
    } else {
      addNotificationAction(dispatch, {
        message: "Failed to map :(",
        severity: "error"
      });
    }
  };
  reduxDispatch(thunk);
};
