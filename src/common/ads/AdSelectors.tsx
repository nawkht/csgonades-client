import { FC, memo } from "react";
import AmazonAffiliateAdd from "./AmazonAffiliateAd";

type Props = {};

const ads = {
  amazon: <AmazonAffiliateAdd />,
  amazon2: <AmazonAffiliateAdd />,
  amazon3: <AmazonAffiliateAdd />,
  lootbox: (
    <a
      href="https://www.dpbolvw.net/click-8411954-13902096"
      target="_top"
      rel="nofollow"
    >
      <img
        src="https://www.lduhtrp.net/image-8411954-13902096"
        width="300"
        height="250"
        alt="Get the #1 monthly mystery box for geeks & gamers!"
      />
    </a>
  ),
  kinguin: (
    <a href="https://www.kqzyfj.com/click-8411954-13918192" target="_top">
      <img
        src="https://www.lduhtrp.net/image-8411954-13918192"
        width="300"
        height="250"
        alt="Promote & make money"
      />
    </a>
  ),
  nordvpn: (
    <a
      href="https://www.tkqlhce.com/click-8411954-12814544"
      target="_top"
      rel="nofollow"
    >
      <img
        src="https://www.ftjcfx.com/image-8411954-12814544"
        width="300"
        height="250"
        alt=""
      />
    </a>
  ),
};

export const AdSelector: FC<Props> = memo(({}) => {
  const currentAd = randomAd(ads);

  return (
    <>
      <div>{currentAd}</div>
      <style jsx>{``}</style>
    </>
  );
});

function randomAd(obj: Record<string, JSX.Element>) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}
