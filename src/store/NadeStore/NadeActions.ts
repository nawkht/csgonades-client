import { tokenSelector } from "../AuthStore/AuthSelectors";
import { NadeApi } from "../../api/NadeApi";
import { ReduxDispatch, ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { addNotificationAction } from "../NotificationStore/NotificationActions";
import { NadeUpdateBody } from "../../models/Nade";

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
