import { NadeLight } from "../../models/Nade/Nade";
import { Report } from "../../models/Report";
import { User } from "../../models/User";

export type AdminRoutes =
  | "pending-nades"
  | "user"
  | "tournaments"
  | "reports"
  | "write-blogpost"
  | "blog"
  | "gallery";

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

type AddReportsAction = {
  type: "@@admin/ADD_REPORTS";
  reports: Report[];
};

export type AdminActions =
  | ChangeAdminRouterAction
  | AddPendingNadesAction
  | AddUsersAction
  | AddReportsAction;

export const changeAdminRouteAction = (
  route: AdminRoutes
): ChangeAdminRouterAction => ({
  type: "@@admin/CHANGE_ROUTE",
  route,
});

export const addPendingNadesAction = (
  nades: NadeLight[]
): AddPendingNadesAction => ({
  type: "@@admin/ADD_PENDING_NADES",
  nades,
});

export const addUsersAction = (users: User[]): AddUsersAction => ({
  type: "@@admin/ADD_USERS",
  users,
});

export const addReportsAction = (reports: Report[]): AddReportsAction => ({
  type: "@@admin/ADD_REPORTS",
  reports,
});
