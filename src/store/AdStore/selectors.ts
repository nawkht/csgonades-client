import { AppState } from "..";

export const adSlotsToDisplaySelector = (state: AppState) =>
  state.adStore.slotsForGroupLoad;

export const adSlotsToRefreshSelector = (state: AppState) =>
  state.adStore.slotsForRefresh;
