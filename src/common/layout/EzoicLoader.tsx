import { FC, memo, useEffect } from "react";

const isBrowser = typeof window !== "undefined";

type Props = {};

export const EzoicLoader: FC<Props> = memo(({}) => {
  useEffect(() => {
    // @ts-ignore
    if (isBrowser && ezstandalone) {
      // @ts-ignore
      ezstandalone.define(102, 101);
      // @ts-ignore
      if (!ezstandalone.enabled) {
        // @ts-ignore
        ezstandalone.enable();
      }
      // @ts-ignore
      ezstandalone.display();
    }
  }, []);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
});
