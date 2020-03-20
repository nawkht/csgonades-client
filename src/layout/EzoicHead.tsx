import { FC, memo, useState, useEffect } from "react";
import { useAdRefresher, ezDisplayAds } from "./useAdRefresher";

type Props = {};

export const EzoicHead: FC<Props> = memo(({}) => {
  const [firstLoad, setFirstLoad] = useState(true);
  useAdRefresher();

  useEffect(() => {
    setTimeout(() => {
      ezDisplayAds();
      setFirstLoad(false);
    }, 2000);
  }, []);

  if (!firstLoad) {
    return null;
  }

  return (
    <>
      <div className="loader">Loading...</div>
      <style jsx>{`
        .loader {
          background: rgba(0, 0, 0, 0.95);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
});
