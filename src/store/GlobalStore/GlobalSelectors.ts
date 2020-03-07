import { AppState } from "..";

export const siteStatsSelector = (state: AppState) => state.globalStore.stats;

export const isNavOpenSelector = (state: AppState) =>
  state.globalStore.isNavOpen;

export const acceptedCookieConsentSelector = (state: AppState) =>
  state.globalStore.acceptedCookieConcent;

export const countryCodeSelector = (state: AppState) =>
  state.globalStore.countryCode;

export const didTryFetchingCountryCodeSelector = (state: AppState) =>
  state.globalStore.didTryFetchingCountryCode;
