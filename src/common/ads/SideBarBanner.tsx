import { FC, memo } from "react";
import AmazonAffiliateAdd from "./AmazonAffiliateAd";

const ads = {
  amazon: <AmazonAffiliateAdd />,
  amazon2: <AmazonAffiliateAdd />,
  amazon3: <AmazonAffiliateAdd />,
  nordVpn: (
    <a
      href="https://www.jdoqocy.com/click-8411954-12814547"
      target="_top"
      rel="nofollow"
    >
      <img
        src="https://www.tqlkg.com/image-8411954-12814547"
        width="160"
        height="600"
        alt=""
      />
    </a>
  ),
  kinguin: (
    <a
      href="https://www.anrdoezrs.net/click-8411954-13652649"
      target="_top"
      rel="nofollow"
    >
      <img
        src="https://www.awltovhc.com/image-8411954-13652649"
        width="160"
        height="600"
        alt="Get New Games Cheaper Hottest Deals"
      />
    </a>
  ),
  lootbox: (
    <a
      href="https://www.anrdoezrs.net/click-8411954-13902092"
      target="_top"
      rel="nofollow"
    >
      <img
        src="https://www.awltovhc.com/image-8411954-13902092"
        width="160"
        height="600"
        alt="#1 Mystery Box For Geeks & Gamers"
      />
    </a>
  ),
};

export const SidebarBanner: FC = memo(() => {
  const currentAd = randomAd(ads);

  return (
    <>
      <div className="sidebar-a">{currentAd}</div>
      <style jsx>{`
        .sidebar-a {
          position: sticky;
          top: 50px;
          max-width: 160px;
        }
      `}</style>
    </>
  );
});

function randomAd(obj: Record<string, JSX.Element>) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}
