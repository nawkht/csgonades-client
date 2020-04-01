import { useEffect } from "react";
import Router, { useRouter } from "next/router";

export const useCheckIfAdsPresent = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    function handleRouteChangeStart() {
      getVisiblePlaceholder(asPath);
    }

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => Router.events.off("routeChangeStart", handleRouteChangeStart);
  }, [asPath]);
};

function getVisiblePlaceholder(url: string) {
  if (!ezstandalone.enabled) {
    return;
  }

  const placeholderElements: Element[] = [];
  const placeholders = document.querySelectorAll<HTMLDivElement>(
    "[id^=ezoic-pub-ad-placeholder]"
  );
  placeholders.forEach((ph) => {
    if (ph.offsetParent !== null) {
      placeholderElements.push(ph);
    }
  });

  let displayedAdsCount = 0;
  placeholderElements.forEach((el) => {
    if (el.innerHTML.includes("<iframe")) {
      displayedAdsCount += 1;
    }
  });

  const selectedPlaceholderCount = Object.keys(
    ezstandalone.selectedPlaceholders
  ).length;

  console.log({
    url,
    selectedPlaceholderCount,
    displayedAdsCount,
  });
}
