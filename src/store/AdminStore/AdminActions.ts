import { NadeLight } from "../../models/Nade/Nade";

export type AdminRoutes = "pending-nades" | "user";

type ChangeAdminRouterAction = {
  type: "@@admin/CHANGE_ROUTE";
  route: AdminRoutes;
};

type AddPendingNadesAction = {
  type: "@@admin/ADD_PENDING_NADES";
  nades: NadeLight[];
};

export type AdminActions = ChangeAdminRouterAction | AddPendingNadesAction;

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
