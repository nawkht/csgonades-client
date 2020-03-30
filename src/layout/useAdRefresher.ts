import { useEffect } from "react";
import { useRouter } from "next/router";

export const useNewAdRefresher = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    console.log(">", asPath);
    if (asPath.includes("adtesting")) {
      return;
    }
    const delay = setTimeout(() => {
      ezRefreshAds();
    }, 500);
    return () => clearTimeout(delay);
  }, [asPath]);
};

export const ezRefreshAds = () => {
  try {
    const csgoEzoicCodes = findAdCode();
    if (!csgoEzoicCodes.length) {
      return;
    }

    if (!ezstandalone.enabled) {
      ezstandalone.cmd.push(function () {
        ezstandalone.define(csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> enable display");
      });
    } else {
      ezstandalone.cmd.push(function () {
        ezstandalone.define(csgoEzoicCodes);
        ezstandalone.refresh();
        console.log("> refresh");
      });
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
