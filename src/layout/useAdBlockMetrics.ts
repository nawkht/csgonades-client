import { useAnalytics } from "../utils/Analytics";
import { useEffect } from "react";

export const useAdBlockMetrics = () => {
  const { event } = useAnalytics();

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      try {
        if (ezstandalone.enabled && ezstandalone.hasDisplayedAds) {
          event({
            category: "AdBlockCheck",
            action: "No Adblock",
          });
        } else {
          event({
            category: "AdBlockCheck",
            action: "Has Adblock",
          });
        }
      } catch (error) {
        event({
          category: "AdBlockCheck",
          action: "Has Adblock",
        });
      }
    }, 3000);
    return () => {
      clearTimeout(delayedCheck);
    };
  }, [event]);
};
