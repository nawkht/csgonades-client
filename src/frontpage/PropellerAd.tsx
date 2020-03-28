import { FC, memo, useCallback } from "react";
import { useIsAdmin } from "../store/AuthStore/AuthHooks";

export const PropellerAd: FC = memo(({}) => {
  const isAdmin = useIsAdmin();
  const adRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }
    const script = document.createElement("script");

    script.src = "//native.propellerclick.com/1?z=3164971";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    node.appendChild(script);
  }, []);

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className="propeller" ref={adRef}></div>
      <style jsx>{`
        .propeller {
          height: 300px;
          width: 100%;
        }
      `}</style>
    </>
  );
});
