import { FC, memo, useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

type Props = {
  codes: number[];
};

export const EzoicLoader: FC<Props> = memo(({ codes }) => {
  const [hasRun, setHasRun] = useState(false);
  useEffect(() => {
    // @ts-ignore
    if (isBrowser && ezstandalone && !hasRun) {
      // @ts-ignore
      if (!ezstandalone.enabled) {
        console.log("> Ezoic enable");
        // @ts-ignore
        ezstandalone.define(...codes);
        // @ts-ignore
        ezstandalone.enable();
        // @ts-ignore
        ezstandalone.display();
      } else {
        console.log("> Ezoic refresh");
        // @ts-ignore
        ezstandalone.refresh();
      }
      setHasRun(true);
    }
  }, [codes, hasRun]);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
});
