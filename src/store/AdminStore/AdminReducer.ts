import { Reducer } from "redux";
import { AdminActions, AdminRoutes } from "./AdminActions";
import { NadeLight } from "../../models/Nade/Nade";

export type AdminState = {
  route: AdminRoutes;
  pendingNades: NadeLight[];
};

const initialState: AdminState = {
  route: "pending-nades",
  pendingNades: []
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
    default:
      return state;
  }
};
