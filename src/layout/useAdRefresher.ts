import { useEffect } from "react";
import { useRouter } from "next/router";

export const useNewAdRefresher = () => {
  const { route, query } = useRouter();

  useEffect(() => {
    if (route.includes("adtesting")) {
      return;
    }
    ezDisplayAds();
  }, [query, route]);
};

export const ezDisplayAds = async () => {
  if (typeof ezstandalone === "undefined") {
    await sleep(2);
  }

  try {
    await sleep(500);
    const csgoEzoicCodes = findAdCode();

    if (!csgoEzoicCodes.length) {
      return;
    }

    ezstandalone.define(csgoEzoicCodes);

    if (!ezstandalone.enabled) {
      await sleep(1000);
      ezstandalone.enable();
      await sleep(1000);
      ezstandalone.display();
      console.log(`> ezstandalone.display (${csgoEzoicCodes.join(",")})`);
    } else {
      await sleep(1000);
      ezstandalone.refresh();
      console.log(`> ezstandalone.refresh (${csgoEzoicCodes.join(",")})`);
    }
  } catch (error) {
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

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
