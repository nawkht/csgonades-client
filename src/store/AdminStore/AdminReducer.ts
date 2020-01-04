import { Reducer } from "redux";
import { AdminActions, AdminRoutes } from "./AdminActions";
import { NadeLight } from "../../models/Nade/Nade";
import { User } from "../../models/User";

export type AdminState = {
  route: AdminRoutes;
  pendingNades: NadeLight[];
  users: User[];
};

const initialState: AdminState = {
  route: "pending-nades",
  pendingNades: [],
  users: []
};

export const AdminReducer: Reducer<AdminState, AdminActions> = (
  state = initialState,
  action
): AdminState => {
  switch (action.type) {
    case "@@admin/CHANGE_ROUTE":
      return {
        ...state,
        route: action.route
      };
    case "@@admin/ADD_PENDING_NADES":
      return {
        ...state,
        pendingNades: action.nades
      };
    case "@@admin/ADD_USERS":
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};
