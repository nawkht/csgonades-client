// @ts-ignore
import * as postscribe from "postscribe";
import React, { FC, useEffect, useRef } from "react";

const TestAd: FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (divRef.current) {
        const div = document.createElement("div");
        div.id = "test";
        divRef.current.append(div);

        postscribe(
          "#test",
          `<div id="amzn-assoc-ad-2efdafa8-6a9e-43d3-857b-c601be6e3bd0"></div>
      <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=2efdafa8-6a9e-43d3-857b-c601be6e3bd0"></script>`
        );
      }
    }, 100);
  }, []);

  return (
    <>
      <div id="container" ref={divRef}></div>

      <style jsx>{`
        #container {
          max-width: 1000px;
          margin: 24px auto;
        }
      `}</style>
    </>
  );
};

export default TestAd;
