import { useEffect } from "react";
import { useRouter } from "next/router";

export const useNewAdRefresher = () => {
  const { route, query } = useRouter();

  useEffect(() => {
    if (route.includes("adtesting")) {
      return;
    }

    const delay = setTimeout(() => {
      ezDisplayAds();
    }, 1000);
    return () => clearTimeout(delay);
  }, [query, route]);
};

export const ezDisplayAds = () => {
  if (typeof ezstandalone === "undefined") {
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
      ezstandalone.cmd.push(function () {
        ezstandalone.define(csgoEzoicCodes);
        ezstandalone.refresh();
        console.log(`> ezstandalone.refresh (${csgoEzoicCodes.join(",")})`);
      });
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

export const useAdDetector = () => {
  const { pathname, query } = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      const adCodes = findAdCode();

      if (!adCodes.length) {
        return;
      }

      const adDivs = document.querySelectorAll('div[id^="google_ads_iframe_"]');

      adDivs.forEach((adDiv) => {
        console.log("> Ad frame lenght", adDiv.innerHTML.length, { adDiv });
      });
    }, 20000);
    return () => clearTimeout(delay);
  }, [pathname, query]);
};
