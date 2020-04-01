import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAnalytics } from "../utils/Analytics";

export const useCheckIfAdsPresent = () => {
  const { asPath } = useRouter();
  const { event } = useAnalytics();

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      if (!ezstandalone.enabled) {
        return;
      }
      const {
        selectedPlaceholderCount,
        displayedAdsCount,
      } = getVisiblePlaceholder();

      if (selectedPlaceholderCount === 0) {
        return;
      }

      event({
        category: "Ad Count",
        action: `Ratio: ${displayedAdsCount / selectedPlaceholderCount}`,
        label: asPath,
        nonInteraction: true,
      });
    }, 15 * 1000);

    return () => clearTimeout(delayedCheck);
  }, [asPath]);
};

function getVisiblePlaceholder() {
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

  return { selectedPlaceholderCount, displayedAdsCount };
}
