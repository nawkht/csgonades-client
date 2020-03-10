import { FC, memo, useEffect } from "react";

const isBrowser = typeof window !== "undefined";

type Props = {};

export const EzoicLoader: FC<Props> = memo(({}) => {
  useEffect(() => {
    const executeEzoic = setTimeout(() => {
      // @ts-ignore
      if (isBrowser && ezstandalone) {
        console.log("> Ezoic execute");
        // @ts-ignore
        ezstandalone.define(102, 101);
        // @ts-ignore
        if (!ezstandalone.enabled) {
          console.log("> Ezoic enable");
          // @ts-ignore
          ezstandalone.enable();
          // @ts-ignore
          ezstandalone.display();
        } else {
          console.log("> Ezoic refresh");
          // @ts-ignore
          ezstandalone.display();
          // @ts-ignore
          ezstandalone.refresh();
        }
      }
    }, 1000);
    return () => clearTimeout(executeEzoic);
  }, []);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
});
