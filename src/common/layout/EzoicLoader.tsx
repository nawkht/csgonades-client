import { FC, memo, useEffect } from "react";

const isBrowser = typeof window !== "undefined";

type Props = {
  codes: number[];
};

export const EzoicLoader: FC<Props> = memo(({ codes }) => {
  useEffect(() => {
    const delay = setTimeout(() => {
      // @ts-ignore
      if (isBrowser && ezstandalone) {
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
      }
    }, 1000);

    return () => {
      clearTimeout(delay);
    };
  }, [codes]);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
});
