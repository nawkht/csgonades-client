import { FC, memo, useMemo } from "react";
import { useCountryCode } from "../../store/GlobalStore/GlobalHooks";
import { Amazon240Monitor } from "./AmazonProds/Amazon240Monitor";
import AmazonMice from "./AmazonProds/AmazonMice";

const ads = {
  amazonMice: <AmazonMice />,
  amazonMonitor: <Amazon240Monitor />,
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
  const { countryCode } = useCountryCode();

  const currentAd = useMemo(() => {
    const allAds = { ...ads };
    const adKeys = Object.keys(allAds);

    // Remove amazon ads if user is not from US
    if (countryCode && !countryCode.includes("US")) {
      for (const currentAd of adKeys) {
        if (currentAd.includes("amazon")) {
          // @ts-ignore
          delete allAds[currentAd];
        }
      }
    }

    return randomAd(allAds);
  }, [countryCode]);

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
