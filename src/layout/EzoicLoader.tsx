import { FC, useEffect, memo } from "react";

type Props = {};

export const EzoicLoader: FC<Props> = memo(({}) => {
  useEffect(() => {
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
  }, []);

  return null;
});

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
