import { FC, memo, useEffect, useState } from "react";
import { ezoicInit } from "./EzoinInit";

export const EzoicLoader: FC = memo(() => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!hasRun) {
      ezoicInit();
      setHasRun(true);
    }
  }, [hasRun]);

  return null;
});
