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
  type: AdType;
};

const isBrowser = typeof window !== "undefined";

export const AdUnit: FC<Props> = memo(({ type }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isBrowser && !isMobile && IS_PROD) {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const { id, height, width } = adIdByType(type);

  return (
    <>
      <div className="placeholder-center">
        <div className="placeholder-wrap">
          <AdGenerator id={id} />
        </div>
      </div>
      <style jsx>{`
        .placeholder-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-wrap {
          min-width: ${width}px;
          min-height: ${height}px;
        }
      `}</style>
    </>
  );
});

const AdGenerator: FC<{ id: number }> = memo(({ id }) => {
  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }

      const firstScript = document.createElement("script");
      firstScript.src = `//ads.themoneytizer.com/s/gen.js?type=${id}`;
      const secondScript = document.createElement("script");
      secondScript.src = `//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=${id}`;
      node.append(firstScript, secondScript);
    },
    [id]
  );

  return <div id={`60796-${id}`} ref={ref}></div>;
});

type AdProps = {
  id: number;
  width: number;
  height: number;
};

function adIdByType(type: AdType): AdProps {
  switch (type) {
    case "mega-bottom":
      return { id: 28, height: 90, width: 728 };
    case "skyscraper":
      return { id: 4, height: 600, width: 120 };
    case "top-medium-rectangle":
      return { id: 2, width: 300, height: 250 };
    case "half-page":
      return { id: 3, width: 300, height: 600 };
    case "mega-banner":
      return { id: 1, width: 728, height: 90 };
    default:
      return { id: 0, height: 0, width: 0 };
  }
}
