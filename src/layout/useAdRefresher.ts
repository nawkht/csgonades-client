import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useNewAdRefresher = () => {
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const { route, query } = useRouter();

  function onRefresh() {
    setLastRefresh(new Date());
  }

  useEffect(() => {
    if (route.includes("adtesting")) {
      return;
    }

    const delay = setTimeout(() => {
      if (!lastRefresh) {
        ezDisplayAds(onRefresh);
        return;
      }

      const timeSinceLastCall = secondsBetween(lastRefresh);

      if (timeSinceLastCall < 30) {
        console.log("> refresh called to fast", timeSinceLastCall);
        return;
      }

      ezDisplayAds(onRefresh);
    }, 1000);
    return () => clearTimeout(delay);
  }, [query, route, lastRefresh]);
};

function secondsBetween(pastDate: Date) {
  const now = new Date();
  const difference = (now.getTime() - pastDate.getTime()) / 1000;
  return Math.floor(difference);
}

export const ezDisplayAds = (onRefreshCalled: Function) => {
  console.log("> ezDisplayAds");
  if (typeof ezstandalone === "undefined") {
    console.log("> ezstandalone not found");
    return;
  }

  const csgoEzoicCodes = findAdCode();
  if (!csgoEzoicCodes.length) {
    return;
  }

  try {
    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(function () {
        ezstandalone.define(csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log(`> ezstandalone.display (${csgoEzoicCodes.join(",")})`);
      });
    } else {
      ezstandalone.cmd.push(() => {
        ezstandalone.define(csgoEzoicCodes);
        ezstandalone.refresh();
        console.log(`> ezstandalone.refresh (${csgoEzoicCodes.join(",")})`);
      });
      onRefreshCalled();
    }
  } catch (error) {
    console.error("> ezstandalone error", error);
    return;
  }
};

function findAdCode() {
  function isHidden(el: any) {
    return el.offsetParent === null;
  }

  const adIds: number[] = [];

  const elements = document.querySelectorAll(
    'div[id^="ezoic-pub-ad-placeholder"]'
  );

  elements.forEach((el) => {
    if (isHidden(el)) {
      return;
    }

    try {
      const id = Number(el.id.split("-").pop());
      adIds.push(id);
    } catch (error) {
      console.error("Failed to parse ad id");
    }
  });

  return adIds;
}
