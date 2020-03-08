import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptCookieConcentAction,
  closeNavigationAction,
  firstRenderCompleteAction,
  toggleNavigationAction,
} from "./GlobalActions";
import {
  acceptedCookieConsentSelector,
  firstRenderSelector,
  isNavOpenSelector,
  siteStatsSelector,
} from "./GlobalSelectors";
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
  const countryCode = navigator ? navigator.language : "";

  const isFromAmerica = useMemo(() => {
    const simpleCountryCode = countryCode.toLowerCase();
    return simpleCountryCode.includes("us");
  }, [countryCode]);

  return {
    countryCode,
    isFromAmerica,
  };
};

export const useFirstRender = () => {
  const dispatch = useDispatch();
  const firstRender = useSelector(firstRenderSelector);

  const firstRenderCompleted = useCallback(() => {
    dispatch(firstRenderCompleteAction());
  }, []);

  return {
    firstRender,
    firstRenderCompleted,
  };
};
