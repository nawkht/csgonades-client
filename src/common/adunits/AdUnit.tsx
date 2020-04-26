import { FC, memo, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { IS_PROD } from "../../constants/Constants";
type AdType =
  | "top-medium-rectangle"
  | "bottom-medium-rectangle"
  | "skyscraper"
  | "mega-bottom"
  | "half-page"
  | "mega-banner";

type Props = {
  tagType: AdType;
  center?: boolean;
};

const isBrowser = typeof window !== "undefined";
const ADS_ENABLED = true;

export const AdUnit: FC<Props> = memo(({ tagType, center }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (ADS_ENABLED && isBrowser && !isMobile && IS_PROD) {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const className = center ? "tz center" : "tz";

  const adProps = adIdByType(tagType);

  return (
    <>
      <div className={className}>
        <AdGenerator {...adProps} />
      </div>
      <style jsx>{`
        .center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
});

type AdProps = {
  id: number;
  height: number;
};

const AdGenerator: FC<AdProps> = memo(({ height, id }) => {
  useEffect(() => {
    injectScripts(id);
  }, [id]);

  return (
    <>
      <div className="tag-container" id={`60796-${id}`}></div>
      <style jsx>{`
        .tag-container {
          min-height: ${height + 5}px;
        }
      `}</style>
    </>
  );
});

function injectScripts(divId: number) {
  const adTagDiv = document.getElementById(`60796-${divId}`);
  if (!adTagDiv) {
    console.warn(">> Ad div not found <<", divId);
    return;
  }
  const script1 = document.createElement("script");
  script1.src = "//ads.themoneytizer.com/s/gen.js?type=" + divId;
  script1.type = "text/javascript";
  adTagDiv.appendChild(script1);

  const script2 = document.createElement("script");
  script2.src =
    "//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=" + divId;
  script2.type = "text/javascript";
  adTagDiv.appendChild(script2);
}

function adIdByType(type: AdType): AdProps {
  switch (type) {
    case "mega-banner":
      return { id: 1, height: 90 };
    case "top-medium-rectangle":
      return { id: 2, height: 250 };
    case "half-page":
      return { id: 3, height: 600 };
    case "skyscraper":
      return { id: 4, height: 600 };
    case "mega-bottom":
      return { id: 28, height: 90 };
    case "bottom-medium-rectangle":
      return { id: 19, height: 250 };
    default:
      console.error("!NEVER!");
      return { id: 0, height: 0 };
  }
}
