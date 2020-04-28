import { FC, memo, useEffect, useMemo } from "react";
import { IS_PROD } from "../../constants/Constants";

type AdType = "300x250";

type Props = {
  tagType: AdType;
  center?: boolean;
};

const ADS_ENABLED = true;

export const AdUnit: FC<Props> = memo(({ tagType }) => {
  useEffect(() => {
    if (!ADS_ENABLED || !IS_PROD) {
      return;
    }

    loadAdByType(tagType);
  }, [tagType]);

  const adId = useMemo(() => {
    switch (tagType) {
      case "300x250":
        return "438793428";
      default:
        return "unknown";
    }
  }, [tagType]);

  return (
    <>
      <div id={adId}></div>
    </>
  );
});

function loadAdByType(type: AdType) {
  switch (type) {
    case "300x250":
      try {
        // @ts-ignore
        window._mNHandle.queue.push(function () {
          // @ts-ignore
          window._mNDetails.loadTag("438793428", "300x250", "438793428");
        });
      } catch (error) {
        console.warn("AdErr", error);
      }
      return;
    default:
      return;
  }
}

/**
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
 */
