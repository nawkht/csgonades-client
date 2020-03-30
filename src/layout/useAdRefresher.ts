import { useEffect } from "react";
import { useRouter } from "next/router";

export const useNewAdRefresher = () => {
  const { asPath, query, pathname } = useRouter();

  useEffect(() => {
    console.log(">", asPath);
    if (asPath.includes("adtesting")) {
      return;
    }
    const delay = setTimeout(() => {
      ezRefreshAds();
    }, 1500);
    return () => clearTimeout(delay);
  }, [asPath, query, pathname]);
};

export const ezRefreshAds = () => {
  try {
    // @ts-ignore
    ezstandalone = ezstandalone || {};
    ezstandalone.cmd = ezstandalone.cmd || [];

    ezstandalone.cmd.push(function () {
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      console.log("> enable display", csgoEzoicCodes);
    });
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
