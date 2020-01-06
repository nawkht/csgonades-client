import { NadeLight } from "../../models/Nade/Nade";
import { User } from "../../models/User";

export type AdminRoutes = "pending-nades" | "user" | "tournaments";

type ChangeAdminRouterAction = {
  type: "@@admin/CHANGE_ROUTE";
  route: AdminRoutes;
};

type AddPendingNadesAction = {
  type: "@@admin/ADD_PENDING_NADES";
  nades: NadeLight[];
};

type AddUsersAction = {
  type: "@@admin/ADD_USERS";
  users: User[];
};

export type AdminActions =
  | ChangeAdminRouterAction
  | AddPendingNadesAction
  | AddUsersAction;

export const changeAdminRouteAction = (
  route: AdminRoutes
): ChangeAdminRouterAction => ({
  type: "@@admin/CHANGE_ROUTE",
  route
});

export const addPendingNadesAction = (
  nades: NadeLight[]
): AddPendingNadesAction => ({
  type: "@@admin/ADD_PENDING_NADES",
  nades
});

export const addUsersAction = (users: User[]): AddUsersAction => ({
  type: "@@admin/ADD_USERS",
  users
});
