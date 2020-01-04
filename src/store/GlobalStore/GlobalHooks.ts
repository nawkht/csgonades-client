import { useSelector, useDispatch } from "react-redux";
import { siteStatsSelector } from "./GlobalSelectors";
import { fetchSiteStatsThunk } from "./GlobalThunks";

export const useSiteStats = () => {
  const dispatch = useDispatch();
  const stats = useSelector(siteStatsSelector);

  function fetchSiteStats() {
    dispatch(fetchSiteStatsThunk());
  }

  return { fetchSiteStats, stats };
};
