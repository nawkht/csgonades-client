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

export type GlobalActions =
  | AddSiteStatsAction
  | ToggleNavigation
  | CloseNavigation;

export const addSiteStatsActon = (stats: SiteStats): AddSiteStatsAction => ({
  type: "@@global/ADD_SITE_STATS",
  stats
});
export const toggleNavigationAction = (): ToggleNavigation => ({
  type: "@@global/TOGGLE_NAVIGATION"
});

export const closeNavigationAction = (): CloseNavigation => ({
  type: "@@global/CLOSE_NAVIGATION"
});
