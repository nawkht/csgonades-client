import { FC, memo, useState, useEffect, useCallback } from "react";

type AdType = "top-medium-rectangle" | "skyscraper";

type Props = {
  type: AdType;
};

const isBrowser = typeof window !== "undefined";

export const AdUnit: FC<Props> = memo(({ type }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isBrowser) {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="ad-unit">
        <AdGenerator type={type} />
      </div>
      <style jsx>{`
        .ad-unit {
        }
      `}</style>
    </>
  );
});

const AdGenerator: FC<Props> = memo(({ type }) => {
  const idByType = type === "skyscraper" ? "4" : "2";

  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }

      const firstScript = document.createElement("script");
      firstScript.src = `//ads.themoneytizer.com/s/gen.js?type=${idByType}`;
      const secondScript = document.createElement("script");
      secondScript.src = `//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=${idByType}`;

      node.append(firstScript, secondScript);
    },
    [idByType]
  );

  return <div id={`60796-${idByType}`} ref={ref} />;
});
