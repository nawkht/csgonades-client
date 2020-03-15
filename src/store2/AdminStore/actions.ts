import { NadeLight } from "../../models/Nade/Nade";
import { Report } from "../../models/Report";
import { User } from "../../models/User";

export type AdminRoutes = "pending-nades" | "user" | "reports" | "gallery";

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
