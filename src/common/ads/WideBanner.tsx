import { FC, useEffect, useState } from "react";
import AmazonAffiliateAdd from "./AmazonAffiliateAd";

type Props = {};

const ads = {
  amazon: <AmazonAffiliateAdd />,
  nordVpn: (
    <a href="https://www.tkqlhce.com/click-8411954-12814552" target="_top">
      <img
        src="https://www.lduhtrp.net/image-8411954-12814552"
        width="970"
        height="250"
        alt=""
      />
    </a>
  ),
};

export const WideBanner: FC<Props> = ({}) => {
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
      <style jsx>{`
        .carusel {
          height: 250px;
          display: flex;
          justify-content: space-around;
          overflow: hidden;
          margin: 26px;
        }
      `}</style>
    </>
  );
};

function randomAd(obj: Record<string, JSX.Element>) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}
