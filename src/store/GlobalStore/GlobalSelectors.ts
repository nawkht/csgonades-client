import { AppState } from "..";

export const siteStatsSelector = (state: AppState) => state.globalStore.stats;

export const isNavOpenSelector = (state: AppState) =>
  state.globalStore.isNavOpen;

export const acceptedCookieConsentSelector = (state: AppState) =>
  state.globalStore.acceptedCookieConcent;

export const showViewSelectorHintSelector = (state: AppState) =>
  state.globalStore.showViewSelectorHint;

export const signInWarningSelector = (state: AppState) =>
  state.globalStore.signInWarning;
