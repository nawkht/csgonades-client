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
      const adblockEnabled = typeof ezstandalone === "undefined";
      if (foundAd) {
        const action = adblockEnabled
          ? `Ad Present [AdBlock On]`
          : `Ad Present [AdBlock Off]`;
        event({
          category: "Ads",
          action,
          label: location,
        });
      } else {
        const action = adblockEnabled
          ? `Ad Not Present [AdBlock On]`
          : `Ad Not Present [AdBlock Off]`;
        event({
          category: "Ads",
          action: action,
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
    const adHtml = el.innerHTML;
    const hasContent = adHtml.length > 0;
    if (hasContent) {
      foundContent = true;
    }
    if (adHtml.includes("iframe") && adHtml.includes("data-load-complete")) {
      console.log("> Found unfilled ad unit");
    }
  });

  return foundContent;
}
