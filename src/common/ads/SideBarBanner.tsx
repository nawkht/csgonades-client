import { FC, memo } from "react";
import AmazonAffiliateAdd from "./AmazonAffiliateAd";

const ads = {
  amazon: <AmazonAffiliateAdd />,
  amazon2: <AmazonAffiliateAdd />,
  nordVpn: (
    <a href="https://www.jdoqocy.com/click-8411954-12814547" target="_top">
      <img
        src="https://www.tqlkg.com/image-8411954-12814547"
        width="160"
        height="600"
        alt=""
      />
    </a>
  ),
};

export const SidebarBanner: FC = memo(() => {
  const currentAd = randomAd(ads);

  return (
    <>
      <div className="sidebar-a">{currentAd}</div>
      <style jsx>{``}</style>
    </>
  );
});

function randomAd(obj: Record<string, JSX.Element>) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}
