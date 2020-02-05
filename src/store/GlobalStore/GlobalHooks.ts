import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNavigationAction, toggleNavigationAction } from "./GlobalActions";
import { isNavOpenSelector, siteStatsSelector } from "./GlobalSelectors";
import { fetchSiteStatsThunk } from "./GlobalThunks";

export const useSiteStats = () => {
  const dispatch = useDispatch();
  const stats = useSelector(siteStatsSelector);

  const fetchSiteStats = useCallback(() => {
    dispatch(fetchSiteStatsThunk());
  }, [dispatch]);

  return { fetchSiteStats, stats };
};

export const useNavigation = () => {
  const dispatch = useDispatch();
  const isNavOpen = useSelector(isNavOpenSelector);

  const toggleNav = useCallback(() => {
    dispatch(toggleNavigationAction());
  }, [dispatch]);

  const closeNav = useCallback(() => {
    dispatch(closeNavigationAction());
  }, [dispatch]);

  return {
    isNavOpen,
    toggleNav,
    closeNav,
  };
};
