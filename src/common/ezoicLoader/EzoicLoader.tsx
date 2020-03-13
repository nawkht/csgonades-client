import { FC, memo, useEffect, useState } from "react";
import { ezoicInit } from "./EzoinInit";

type Props = {
  codes: number[];
};

export const EzoicLoader: FC<Props> = memo(({ codes }) => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!hasRun) {
        ezoicInit(codes);
        setHasRun(true);
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [hasRun, codes]);

  return null;
});
