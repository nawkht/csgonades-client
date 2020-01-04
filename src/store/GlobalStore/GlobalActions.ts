import { SiteStats } from "../../api/StatsApi";

type AddSiteStatsAction = {
  type: "@@global/ADD_SITE_STATS";
  stats: SiteStats;
};

export type GlobalActions = AddSiteStatsAction;

export const addSiteStatsActon = (stats: SiteStats): AddSiteStatsAction => ({
  type: "@@global/ADD_SITE_STATS",
  stats
});
