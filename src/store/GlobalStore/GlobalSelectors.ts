import { AppState } from "..";

export const siteStatsSelector = (state: AppState) => state.globalStore.stats;
