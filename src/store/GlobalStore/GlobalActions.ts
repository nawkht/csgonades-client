import { SiteStats } from "../../api/StatsApi";

type AddSiteStats = {
  readonly type: "Global/AddSiteStats";
  readonly stats: SiteStats;
};

type ToggleNavigation = {
  readonly type: "Global/ToggleNavigation";
};

type CloseNavigation = {
  readonly type: "Global/CloseNavigation";
};

type AcceptCookieConcent = {
  readonly type: "Global/AcceptCookieConcent";
};

type HideViewSelectorHint = {
  type: "Global/HideViewSelectorHint";
};

export type SignInWarningType = "favorite" | "filterpro";

type SetSignInWarning = {
  type: "Global/SetSignInWarning";
  warningType: SignInWarningType;
};

type ClearSignInWarning = {
  type: "Global/ClearSignInWarning";
};

export type GlobalActions =
  | AddSiteStats
  | ToggleNavigation
  | CloseNavigation
  | AcceptCookieConcent
  | HideViewSelectorHint
  | SetSignInWarning
  | ClearSignInWarning;

export const addSiteStatsActon = (stats: SiteStats): AddSiteStats => ({
  type: "Global/AddSiteStats",
  stats,
});

export const acceptCookieConcentAction = (): AcceptCookieConcent => ({
  type: "Global/AcceptCookieConcent",
});

export const toggleNavigationAction = (): ToggleNavigation => ({
  type: "Global/ToggleNavigation",
});

export const closeNavigationAction = (): CloseNavigation => ({
  type: "Global/CloseNavigation",
});
