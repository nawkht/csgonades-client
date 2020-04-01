import { useEffect } from "react";
import { useRouter } from "next/router";

export const useCheckIfAdsPresent = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      getVisiblePlaceholder(asPath);
    }, 15 * 1000);

    return () => clearTimeout(delayedCheck);
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
