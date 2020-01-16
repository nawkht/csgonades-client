import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { addNotificationActionThunk } from "../NotificationStore/NotificationThunks";
import { NadeApi } from "../../api/NadeApi";
import {
  addPendingNadesAction,
  addUsersAction,
  addReportsAction
} from "./AdminActions";
import { UserApi } from "../../api/UserApi";
import { ReportApi } from "../../api/ReportApi";

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

export const fetchUsersThunk = (
  page: number,
  limit: number,
  sortByActivity: boolean
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't fetch users, seems like your not signed in.",
          severity: "error"
        })
      );
    }

    const users = await UserApi.fetchUsers(
      page,
      limit,
      sortByActivity,
      authToken
    );

    if (users.isErr()) {
      console.error(users.error);
      return;
    }

    return dispatch(addUsersAction(users.value));
  };
};

export const fetchReportsThunk = (): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const authToken = tokenSelector(getState());
    if (!authToken) {
      return dispatch(
        addNotificationActionThunk({
          message: "Can't fetch reports, seems like your not signed in.",
          severity: "error"
        })
      );
    }

    const reports = await ReportApi.getAll(authToken);

    if (reports.isErr()) {
      console.error(reports.error);
      return;
    }

    return dispatch(addReportsAction(reports.value));
  };
};
