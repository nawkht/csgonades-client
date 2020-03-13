import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptCookieConcentAction,
  closeNavigationAction,
  toggleNavigationAction,
} from "./GlobalActions";
import {
  acceptedCookieConsentSelector,
  isNavOpenSelector,
  siteStatsSelector,
} from "./GlobalSelectors";
import { fetchSiteStatsThunk } from "./GlobalThunks";

const isBrowser = typeof window != "undefined";

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
  let countryCode = "";

  if (isBrowser) {
    countryCode = navigator.language;
  }

  const isFromAmerica = useMemo(() => {
    const simpleCountryCode = countryCode.toLowerCase();
    return simpleCountryCode.includes("us");
  }, [countryCode]);

  return {
    countryCode,
    isFromAmerica,
  };
};
