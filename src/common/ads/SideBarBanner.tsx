import { FC, useEffect, useState } from "react";
import AmazonAffiliateAdd from "./AmazonAffiliateAd";

type Props = {};

const ads = {
  amazon: <AmazonAffiliateAdd />,
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

export const SidebarBanner: FC<Props> = ({}) => {
  const [currentAd, setCurrentAd] = useState(randomAd(ads));
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const rotateTimer = setInterval(() => {
      const nextAd = randomAd(ads);
      if (!paused) {
        setCurrentAd(nextAd);
      }
    }, 30000);
    return () => {
      clearInterval(rotateTimer);
    };
  }, [paused]);

  function pauseRotate() {
    setPaused(true);
  }

  function playRotate() {
    setPaused(false);
  }

  return (
    <>
      <div
        className="carusel"
        onMouseEnter={pauseRotate}
        onMouseLeave={playRotate}
      >
        {currentAd}
      </div>
      <style jsx>{``}</style>
    </>
  );
};

function randomAd(obj: Record<string, JSX.Element>) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}
