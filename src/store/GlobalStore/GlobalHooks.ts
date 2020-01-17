import { useDispatch, useSelector } from "react-redux";
import { closeNavigationAction, toggleNavigationAction } from "./GlobalActions";
import { isNavOpenSelector, siteStatsSelector } from "./GlobalSelectors";
import { fetchSiteStatsThunk } from "./GlobalThunks";

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
