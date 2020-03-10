import { FC } from "react";
import { Amazon240Monitor } from "./AmazonProds/Amazon240Monitor";
import AmazonMice from "./AmazonProds/AmazonMice";

type Props = {};

const ads = {
  amazonMice: <AmazonMice />,
  amazonMonitor: <Amazon240Monitor />,
};

export const WideBanner: FC<Props> = ({}) => {
  // const { isFromAmerica } = useCountryCode();
  const currentAd = randomAd(ads);

  return (
    <>
      <div className="carusel">{currentAd}</div>
      <style jsx>{`
        .carusel {
          height: 260px;
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
