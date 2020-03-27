import { useEffect } from "react";
import { useAnalytics } from "../utils/Analytics";
import { useRouter } from "next/router";
import { APP_VERSION } from "../constants/Constants";

export const useAdblockAnalytics = () => {
  const { pathname } = useRouter();
  const { event } = useAnalytics();

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      const adblockEnabled = typeof ezstandalone === "undefined";
      if (adblockEnabled) {
        event({
          category: "Ads",
          action: `Adblock On`,
          label: APP_VERSION,
          nonInteraction: true,
        });
      } else {
        event({
          category: "Ads",
          action: "Adblock Off",
          label: APP_VERSION,
          nonInteraction: true,
        });
      }
    }, 1000);

    return () => clearTimeout(delayedCheck);
  }, [event, pathname]);
};
