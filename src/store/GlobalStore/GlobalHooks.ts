import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptCookieConcentAction,
  closeNavigationAction,
  toggleNavigationAction,
} from "./GlobalActions";
import {
  acceptedCookieConsentSelector,
  countryCodeSelector,
  isNavOpenSelector,
  siteStatsSelector,
} from "./GlobalSelectors";
import { fetchSiteStatsThunk, fetchUserCountryCodeThunk } from "./GlobalThunks";

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

export const useCountryCode = () => {
  const dispatch = useDispatch();
  const countryCode = useSelector(countryCodeSelector);

  const fetchUserCountry = useCallback(() => {
    dispatch(fetchUserCountryCodeThunk());
  }, [dispatch]);

  return {
    fetchUserCountry,
    countryCode,
  };
};
