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
          // @ts-ignore
          ezstandalone.enable();
        }
        // @ts-ignore
        ezstandalone.display();
        // @ts-ignore
        ezstandalone.refresh();
      }
    }, 1000);

    return () => {
      // @ts-ignore
      if (ezstandalone) {
        // @ts-ignore
        ezstandalone.destroy();
        clearTimeout(executeEzoic);
      }
    };
  }, []);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
});
