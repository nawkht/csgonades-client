import { AppState } from "..";

export const siteStatsSelector = (state: AppState) => state.globalStore.stats;

export const isNavOpenSelector = (state: AppState) =>
  state.globalStore.isNavOpen;
