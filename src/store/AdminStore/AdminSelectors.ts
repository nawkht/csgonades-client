import { AppState } from "..";

export const adminRouteSelector = (state: AppState) => {
  return state.adminStore.route;
};

export const pendingNadesSelector = (state: AppState) => {
  return state.adminStore.pendingNades;
};
