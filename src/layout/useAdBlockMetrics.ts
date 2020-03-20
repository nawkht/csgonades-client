import { useAnalytics } from "../utils/Analytics";
import { useEffect } from "react";

export const useAdBlockMetrics = () => {
  const { event } = useAnalytics();

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      if (typeof ezstandalone === "undefined") {
        event({
          category: "AdBlockCheck",
          action: "Has Adblock",
        });
      } else {
        event({
          category: "AdBlockCheck",
          action: "No Adblock",
        });
      }
    }, 3000);
    return () => {
      clearTimeout(delayedCheck);
    };
  }, [event]);
};
