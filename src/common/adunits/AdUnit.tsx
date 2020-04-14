import { FC, memo, useState, useEffect } from "react";
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

  console.log("Render ad unit", type);

  return (
    <>
      <div className="ad-unit">{adCodeByType(type)}</div>
      <style jsx>{`
        .ad-unit {
          min-width: 100%;
        }
      `}</style>
    </>
  );
});

function adCodeByType(type: AdType) {
  switch (type) {
    case "top-medium-rectangle":
      return (
        <div id="60796-2">
          <script src="//ads.themoneytizer.com/s/gen.js?type=2"></script>
          <script src="//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=2"></script>
        </div>
      );
    case "skyscraper":
      return (
        <div id="60796-4">
          <script src="//ads.themoneytizer.com/s/gen.js?type=4"></script>
          <script src="//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=4"></script>
        </div>
      );
    default:
      return <></>;
  }
}
