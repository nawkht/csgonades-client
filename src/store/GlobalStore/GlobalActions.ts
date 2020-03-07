import { SiteStats } from "../../api/StatsApi";
import { Meta } from "../Analytics/AnalyticsMiddleware";

type AddSiteStatsAction = {
  readonly type: "@@global/ADD_SITE_STATS";
  readonly stats: SiteStats;
};

type ToggleNavigation = {
  readonly type: "@@global/TOGGLE_NAVIGATION";
};

type CloseNavigation = {
  readonly type: "@@global/CLOSE_NAVIGATION";
};

type AcceptCookieConcent = {
  readonly type: "@@global/ACCEPT_COOKIE_CONCENT";
  readonly meta: Meta;
};

type AddCountryCode = {
  readonly type: "@@global/ADD_COUNTRY_CODE";
  readonly countryCode: string;
};

type DidTryFetchingCountryCode = {
  readonly type: "@@global/DID_TRY_FETCHING_COUNTRY_CODE";
};

export type GlobalActions =
  | AddSiteStatsAction
  | ToggleNavigation
  | CloseNavigation
  | AcceptCookieConcent
  | AddCountryCode
  | DidTryFetchingCountryCode;

export const addSiteStatsActon = (stats: SiteStats): AddSiteStatsAction => ({
  type: "@@global/ADD_SITE_STATS",
  stats,
});

export const acceptCookieConcentAction = (): AcceptCookieConcent => ({
  type: "@@global/ACCEPT_COOKIE_CONCENT",
  meta: {
    gaEvent: {},
  },
});

export const toggleNavigationAction = (): ToggleNavigation => ({
  type: "@@global/TOGGLE_NAVIGATION",
});

export const closeNavigationAction = (): CloseNavigation => ({
  type: "@@global/CLOSE_NAVIGATION",
});

export const addCountryCodeAction = (countryCode: string): AddCountryCode => ({
  type: "@@global/ADD_COUNTRY_CODE",
  countryCode,
});

export const didTryFetchingCountryCodeAction = (): DidTryFetchingCountryCode => ({
  type: "@@global/DID_TRY_FETCHING_COUNTRY_CODE",
});
