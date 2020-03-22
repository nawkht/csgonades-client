import { useEffect } from "react";
import { useAnalytics } from "../utils/Analytics";

export const useCheckIfAdPresent = () => {
  const { event } = useAnalytics();

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      const foundAd = checkIfAdPresent();
      if (foundAd) {
        console.log("> Ad present");
        event({
          category: "Ads",
          action: "Ad present",
        });
      } else {
        console.log("> Ad not present");
        event({
          category: "Ads",
          action: "Ad not present",
        });
      }
    }, 3000);

    return () => clearTimeout(delayedCheck);
  }, [event]);
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
