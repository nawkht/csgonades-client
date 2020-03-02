import { FC } from "react";
import AmazonAffiliateAdd from "./AmazonAffiliateAd";

type Props = {};

export const AdSelector: FC<Props> = ({}) => {
  const adComps = [
    <AmazonAffiliateAdd key="1" />,
    <AmazonAffiliateAdd key="2" />,
    <>
      <a href="https://www.kqzyfj.com/click-8411954-12814544" target="_top">
        <img
          src="https://www.tqlkg.com/image-8411954-12814544"
          width="300"
          height="250"
          alt=""
        />
      </a>
    </>,
  ];

  const randomAd = adComps[Math.floor(Math.random() * adComps.length)];

  return (
    <>
      <div>{randomAd}</div>
      <style jsx>{``}</style>
    </>
  );
};
