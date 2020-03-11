import { FC, memo, useEffect, useState } from "react";
import { ezoicInit } from "./EzoinInit";

type Props = {
  codes: number[];
};

export const EzoicLoader: FC<Props> = memo(({ codes }) => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!hasRun) {
      ezoicInit(codes);
      setHasRun(true);
    }
  }, [hasRun, codes]);

  return null;
});
