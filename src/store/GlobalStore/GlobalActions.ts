import { SiteStats } from "../../api/StatsApi";

type AddSiteStatsAction = {
  type: "@@global/ADD_SITE_STATS";
  stats: SiteStats;
};

type ToggleNavigation = {
  type: "@@global/TOGGLE_NAVIGATION";
};

type CloseNavigation = {
  type: "@@global/CLOSE_NAVIGATION";
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
