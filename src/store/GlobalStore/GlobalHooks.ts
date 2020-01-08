import { useSelector, useDispatch } from "react-redux";
import { siteStatsSelector, isNavOpenSelector } from "./GlobalSelectors";
import { fetchSiteStatsThunk } from "./GlobalThunks";
import { toggleNavigationAction, closeNavigationAction } from "./GlobalActions";

export const useSiteStats = () => {
  const dispatch = useDispatch();
  const stats = useSelector(siteStatsSelector);

  function fetchSiteStats() {
    dispatch(fetchSiteStatsThunk());
  }

  return { fetchSiteStats, stats };
};

export const useNavigation = () => {
  const dispatch = useDispatch();
  const isNavOpen = useSelector(isNavOpenSelector);

  function toggleNav() {
    dispatch(toggleNavigationAction());
  }

  function closeNav() {
    dispatch(closeNavigationAction());
  }

  return {
    isNavOpen,
    toggleNav,
    closeNav
  };
};
