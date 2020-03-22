import { useEffect } from "react";
import { useAnalytics } from "../utils/Analytics";
import { useRouter } from "next/router";

export const useCheckIfAdPresent = () => {
  const { pathname } = useRouter();
  const { event } = useAnalytics();

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      const location = window.location.pathname + window.location.search;
      const foundAd = checkIfAdPresent();
      if (foundAd) {
        event({
          category: "Ads",
          action: "Ad present",
          label: location,
        });
      } else {
        event({
          category: "Ads",
          action: "Ad not present",
          label: location,
        });
      }
    }, 3000);

    return () => clearTimeout(delayedCheck);
  }, [event, pathname]);
};

function checkIfAdPresent(): boolean {
  const elements = document.querySelectorAll(
    'div[id^="ezoic-pub-ad-placeholder"]'
  );

  let foundContent = false;

  elements.forEach(el => {
    const hasContent = el.innerHTML.length > 0;
    if (hasContent) {
      foundContent = true;
    }
  });

  return foundContent;
}
