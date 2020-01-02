import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { addNotificationActionThunk } from "../NotificationStore/NotificationThunks";
import { NadeApi } from "../../api/NadeApi";
import { addPendingNadesAction } from "./AdminActions";

export const fetchPendingNadeThunk = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't fetch user, seems like your not signed in.",
          severity: "error"
        })
      );
    }

    const result = await NadeApi.getPending(authToken);

    if (result.isErr()) {
      console.error(result.error);
      return;
    }

    const nades = result.value;

    dispatch(addPendingNadesAction(nades));
  };
};
