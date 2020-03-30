import React from "react";

export class EzoicLoader extends React.PureComponent {
  componentDidMount() {
    try {
      ezstandalone.cmd.push(function () {
        const csgoEzoicCodes = findAdCode();
        ezstandalone.define(csgoEzoicCodes);
        ezstandalone.enable();
        ezstandalone.display();
        console.log("> enable display", csgoEzoicCodes);
      });
    } catch (error) {
      // no-op
    }
  }
  render() {
    return null;
  }
}

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
