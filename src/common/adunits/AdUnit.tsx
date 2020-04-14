import { FC, memo, useState, useEffect, useCallback } from "react";

type AdType = "top-medium-rectangle" | "skyscraper";

type Props = {
  type: AdType;
};

const isBrowser = typeof window !== "undefined";

export const AdUnit: FC<Props> = memo(({ type }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isBrowser) {
        setMounted(true);
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  if (!mounted) {
    return null;
  }

  const adTypeId = type === "skyscraper" ? 4 : 2;

  return (
    <>
      <AdGenerator id={adTypeId} />
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
