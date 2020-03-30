import { AppState } from "..";

export const siteStatsSelector = (state: AppState) => state.globalStore.stats;

export const isNavOpenSelector = (state: AppState) =>
  state.globalStore.isNavOpen;

export const acceptedCookieConsentSelector = (state: AppState) =>
  state.globalStore.acceptedCookieConcent;

export const clientConfigSelector = (state: AppState) =>
  state.globalStore.clientConfig;
