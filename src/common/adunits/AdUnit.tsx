import { FC, memo, useState, useEffect, useCallback } from "react";
import { isMobile } from "react-device-detect";
import { IS_PROD } from "../../constants/Constants";
type AdType =
  | "top-medium-rectangle"
  | "skyscraper"
  | "mega-bottom"
  | "half-page"
  | "mega-banner";

type Props = {
  tagType: AdType;
};

const isBrowser = typeof window !== "undefined";

export const AdUnit: FC<Props> = memo(({ tagType }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const delay = setTimeout(() => {
      if (isBrowser && !isMobile && IS_PROD) {
        setMounted(true);
      }
    }, 5000);
    return () => clearTimeout(delay);
  }, []);

  if (!mounted) {
    return null;
  }

  const adProps = adIdByType(tagType);

  return (
    <>
      <AdGenerator {...adProps} />
    </>
  );
});

type AdProps = {
  id: number;
  width: number;
  height: number;
};

const AdGenerator: FC<AdProps> = memo(({ height, id, width }) => {
  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }

      const firstScript = document.createElement("script");
      firstScript.src = `//ads.themoneytizer.com/s/gen.js?type=${id}`;
      const secondScript = document.createElement("script");
      secondScript.src = `//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=${id}`;
      node.appendChild(firstScript);
      node.appendChild(secondScript);
    },
    [id]
  );

  return (
    <>
      <div className="tag-container" id={`60796-${id}`} ref={ref}></div>
      <style jsx>{`
        .tag-container {
          min-width: ${width}px;
          min-height: ${height}px;
        }
      `}</style>
    </>
  );
});

function adIdByType(type: AdType): AdProps {
  switch (type) {
    case "mega-banner":
      return { id: 1, width: 728, height: 90 };
    case "top-medium-rectangle":
      return { id: 2, width: 300, height: 250 };
    case "half-page":
      return { id: 3, width: 300, height: 600 };
    case "skyscraper":
      return { id: 4, height: 600, width: 120 };
    case "mega-bottom":
      return { id: 28, height: 90, width: 728 };
    default:
      console.error("!NEVER!");
      return { id: 0, height: 0, width: 0 };
  }
}
