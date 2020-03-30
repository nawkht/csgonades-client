import React from "react";

export class EzoicLoader extends React.PureComponent {
  componentDidMount() {
    const ezstandalone = (window.ezstandalone = window.ezstandalone || {});
    ezstandalone.cmd = ezstandalone.cmd || [];
    ezstandalone.cmd.push(function () {
      const csgoEzoicCodes = findAdCode();
      ezstandalone.define(...csgoEzoicCodes);
      ezstandalone.enable();
      ezstandalone.display();
      ezstandalone.refresh();
      console.log("> enable display", csgoEzoicCodes);
    });
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
