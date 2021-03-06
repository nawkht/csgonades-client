import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatsApi } from "../../api/StatsApi";
import {
  acceptCookieConcentAction,
  addSiteStatsActon,
  closeNavigationAction,
  toggleNavigationAction,
} from "./GlobalActions";
import {
  acceptedCookieConsentSelector,
  isNavOpenSelector,
  siteStatsSelector,
} from "./GlobalSelectors";

export const useSiteStats = () => {
  const dispatch = useDispatch();
  const stats = useSelector(siteStatsSelector);

  const fetchSiteStats = useCallback(async () => {
    const result = await StatsApi.getStats();

    if (result.isErr()) {
      console.error(result.error);
      return;
    }

    dispatch(addSiteStatsActon(result.value));
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

export const useCookieConcent = () => {
  const dispatch = useDispatch();
  const acceptedCookieConsent = useSelector(acceptedCookieConsentSelector);

  const acceptCookieConcent = useCallback(() => {
    dispatch(acceptCookieConcentAction());
  }, [dispatch]);

  return {
    acceptedCookieConsent,
    acceptCookieConcent,
  };
};
