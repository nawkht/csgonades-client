import { useSelector, useDispatch } from "react-redux";
import { siteStatsSelector, isNavOpenSelector } from "./GlobalSelectors";
import { fetchSiteStatsThunk } from "./GlobalThunks";
import { toggleNavigationAction, closeNavigationAction } from "./GlobalActions";
import { useTheme } from "../LayoutStore/LayoutHooks";

export const useSiteStats = () => {
  const dispatch = useDispatch();
  const stats = useSelector(siteStatsSelector);

  function fetchSiteStats() {
    dispatch(fetchSiteStatsThunk());
  }

  return { fetchSiteStats, stats };
};

export const useNavigation = () => {
  const { isMobile } = useTheme();
  const dispatch = useDispatch();
  const isNavOpenStore = useSelector(isNavOpenSelector);

  const isNavOpen = !isMobile ? true : isNavOpenStore;

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
