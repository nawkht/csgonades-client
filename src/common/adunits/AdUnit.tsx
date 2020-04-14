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
      <div className="ad-unit">{adCodeByType(type)}</div>
      <style jsx>{`
        .ad-unit {
        }
      `}</style>
    </>
  );
});

const SkySkaper = memo(() => {
  const ref = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }

    const firstScript = document.createElement("script");
    firstScript.src = "//ads.themoneytizer.com/s/gen.js?type=4";
    const secondScript = document.createElement("script");
    secondScript.src =
      "//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=4";

    node.append(firstScript, secondScript);
  }, []);

  return <div ref={ref} id="60796-4"></div>;
});

const TopMedRec = memo(() => {
  const ref = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }

    const firstScript = document.createElement("script");
    firstScript.src = "//ads.themoneytizer.com/s/gen.js?type=2";
    const secondScript = document.createElement("script");
    secondScript.src =
      "//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=2";

    node.append(firstScript, secondScript);
  }, []);

  console.log("TopMedRec render");

  return <div ref={ref} id="60796-2"></div>;
});

function adCodeByType(type: AdType) {
  switch (type) {
    case "top-medium-rectangle":
      return <TopMedRec />;
    case "skyscraper":
      return <SkySkaper />;
    default:
      return <></>;
  }
}
