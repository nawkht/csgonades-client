import { FC } from "react";
import AmazonAffiliateAdd from "./AmazonAffiliateAd";
import { AmazonBounty } from "./AmazonBounty";

type Props = {};

export const AdSelector: FC<Props> = ({}) => {
  const adComps = [<AmazonAffiliateAdd key="1" />, <AmazonBounty key="2" />];

  const randomAd = adComps[Math.floor(Math.random() * adComps.length)];

  return (
    <>
      <div>{randomAd}</div>
      <style jsx>{``}</style>
    </>
  );
};
