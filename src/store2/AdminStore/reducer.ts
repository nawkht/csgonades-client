import { Reducer } from "redux";
import { NadeLight } from "../../models/Nade/Nade";
import { Report } from "../../models/Report";
import { User } from "../../models/User";
import { assertNever } from "../../utils/Common";
import { AdminActions, AdminRoutes } from "./actions";

export type AdminState = {
  route: AdminRoutes;
  pendingNades: NadeLight[];
  users: User[];
  reports: Report[];
};

export const initialState: AdminState = {
  route: "pending-nades",
  pendingNades: [],
  users: [],
  reports: [],
};

export const AdminReducer: Reducer<AdminState, AdminActions> = (
  state = initialState,
  action
): AdminState => {
  switch (action.type) {
    case "@@admin/CHANGE_ROUTE":
      return {
        ...state,
        route: action.route,
      };
    case "@@admin/ADD_PENDING_NADES":
      return {
        ...state,
        pendingNades: action.nades,
      };
    case "@@admin/ADD_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "@@admin/ADD_REPORTS":
      return {
        ...state,
        reports: action.reports,
      };
    default:
      assertNever(action);
      return state;
  }
};
