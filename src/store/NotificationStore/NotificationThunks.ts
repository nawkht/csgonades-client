import { NotificationApi } from "../../api/NotificationApi";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { markNotificationAsSeenAction } from "./NotificationActions";

export const markNotifcationAsViewedThunk = (id: string): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());

    if (!authToken) {
      console.error("Missing token");
      return;
    }

    dispatch(markNotificationAsSeenAction(id));

    await NotificationApi.markAsViewed(id, authToken);
  };
};
