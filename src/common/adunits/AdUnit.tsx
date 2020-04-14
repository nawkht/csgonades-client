import { FC, memo, useState, useEffect, useCallback } from "react";
import { useIsAdmin } from "../../store/AuthStore/AuthHooks";

type AdType = "top-medium-rectangle" | "skyscraper";

type Props = {
  type: AdType;
};

const isBrowser = typeof window !== "undefined";

export const AdUnit: FC<Props> = memo(({ type }) => {
  const isAdmin = useIsAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isBrowser && isAdmin) {
      setMounted(true);
    }
  }, [isAdmin]);

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
    firstScript.async = true;
    const secondScript = document.createElement("script");
    secondScript.src =
      "//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=4";
    secondScript.async = true;

    node.append(firstScript);
    node.append(secondScript);
  }, []);

  console.log("Skyskraper render");

  return <div ref={ref} id="60796-4"></div>;
});

const TopMedRec = memo(() => {
  const ref = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }

    const firstScript = document.createElement("script");
    firstScript.src = "//ads.themoneytizer.com/s/gen.js?type=2";
    firstScript.async = true;
    const secondScript = document.createElement("script");
    secondScript.src =
      "//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=2";
    secondScript.async = true;

    node.append(firstScript);
    node.append(secondScript);
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
