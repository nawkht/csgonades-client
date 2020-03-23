import { useEffect } from "react";
import { useAnalytics } from "../utils/Analytics";
import { useRouter } from "next/router";

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
          nonInteraction: true,
        });
      } else {
        event({
          category: "Ads",
          action: "Adblock Off",
          nonInteraction: true,
        });
      }
    }, 1000);

    return () => clearTimeout(delayedCheck);
  }, [event, pathname]);
};
