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
  console.log("> ezDisplayAds");
  if (typeof ezstandalone === "undefined") {
    console.log("> ezstandalone not found");
    await sleep(2);
  }

  try {
    await sleep(0.5);
    const csgoEzoicCodes = findAdCode();

    if (!csgoEzoicCodes.length) {
      return;
    }

    ezstandalone.define(csgoEzoicCodes);

    if (!ezstandalone.enabled) {
      ezstandalone.enable();
      await sleep(3);
      ezstandalone.display();
      console.log(`> ezstandalone.display (${csgoEzoicCodes.join(",")})`);
    } else {
      await sleep(3);
      ezstandalone.refresh();
      console.log(`> ezstandalone.refresh (${csgoEzoicCodes.join(",")})`);
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

const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
