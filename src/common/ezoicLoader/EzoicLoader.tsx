// @ts-nocheck
import { FC, memo, useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

type Props = {
  codes: number[];
};

export const EzoicLoader: FC<Props> = memo(({ codes }) => {
  const [cleanEzoicObject, setCleanEzoicObject] = useState(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!hasRun) {
      if (isBrowser && ezstandalone) {
        if (ezstandalone) {
          const copyOriginal = Object.assign({}, ezstandalone);
          setCleanEzoicObject(copyOriginal);
        }

        ezstandalone.DEBUG = true;
        ezstandalone.define(...codes);
        ezstandalone.enable();
        ezstandalone.display();
      }
      setHasRun(true);
    }
    return () => {
      console.log("> Resetting ezoic");
      if (cleanEzoicObject) {
        ezstandalone = cleanEzoicObject;
      }
    };
  }, [codes, hasRun, cleanEzoicObject]);

  return null;
});
