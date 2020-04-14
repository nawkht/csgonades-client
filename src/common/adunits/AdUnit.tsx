import { FC, memo, useState, useEffect } from "react";

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
      <div id=""></div>
      <div className="ad-unit">{adCodeByType(type)}</div>
      <style jsx>{`
        .ad-unit {
        }
      `}</style>
    </>
  );
});

const SkySkaper = memo(() => {
  useEffect(() => {
    const div = document.getElementById("60796-4");
    if (!div) {
      console.log("Ad div not found");
      return;
    }
    const firstScript = document.createElement("script");
    firstScript.src = "//ads.themoneytizer.com/s/gen.js?type=4";
    const secondScript = document.createElement("script");
    secondScript.src =
      "//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=4";
    div.appendChild(firstScript);
    div.appendChild(secondScript);
    return () => {
      if (div) {
        div.innerHTML = "";
      }
    };
  }, []);

  return <div id="60796-4"></div>;
});

const TopMedRec = memo(() => {
  useEffect(() => {
    const div = document.getElementById("60796-2");
    if (!div) {
      console.log("Ad div not found");
      return;
    }
    const firstScript = document.createElement("script");
    firstScript.src = "//ads.themoneytizer.com/s/gen.js?type=2";
    const secondScript = document.createElement("script");
    secondScript.src =
      "//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=2";
    div.appendChild(firstScript);
    div.appendChild(secondScript);
    return () => {
      if (div) {
        div.innerHTML = "";
      }
    };
  }, []);

  console.log("TopMedRec render");

  return <div id="60796-2"></div>;
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
