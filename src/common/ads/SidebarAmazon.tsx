import { FC, memo, useMemo } from "react";
import { useCountryCode } from "../../store/GlobalStore/GlobalHooks";
import { Amazon240Monitor } from "./AmazonProds/Amazon240Monitor";
import AmazonMice from "./AmazonProds/AmazonMice";

const ads = {
  amazonMice: <AmazonMice />,
  amazonMonitor: <Amazon240Monitor />,
};

export const SidebarAmazon: FC = memo(() => {
  const { isFromAmerica } = useCountryCode();

  const currentAd = useMemo(() => {
    return randomAd(ads);
  }, []);

  if (!isFromAmerica) {
    return null;
  }

  return (
    <>
      <div className="sidebar-a">{currentAd}</div>
      <style jsx>{`
        .sidebar-a {
          width: 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      `}</style>
    </>
  );
});

function randomAd(obj: Record<string, JSX.Element>) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}
