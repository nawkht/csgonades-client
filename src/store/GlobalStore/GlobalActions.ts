import { SiteStats } from "../../api/StatsApi";

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
};

type HideViewSelectorHint = {
  type: "@@global/HideViewSelectorHint";
};

export type GlobalActions =
  | AddSiteStatsAction
  | ToggleNavigation
  | CloseNavigation
  | AcceptCookieConcent
  | HideViewSelectorHint;

export const addSiteStatsActon = (stats: SiteStats): AddSiteStatsAction => ({
  type: "@@global/ADD_SITE_STATS",
  stats,
});

export const acceptCookieConcentAction = (): AcceptCookieConcent => ({
  type: "@@global/ACCEPT_COOKIE_CONCENT",
});

export const toggleNavigationAction = (): ToggleNavigation => ({
  type: "@@global/TOGGLE_NAVIGATION",
});

export const closeNavigationAction = (): CloseNavigation => ({
  type: "@@global/CLOSE_NAVIGATION",
});
