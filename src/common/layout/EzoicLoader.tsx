import { FC, memo, useEffect } from "react";
import { useIsAdmin } from "../../store/AuthStore/AuthHooks";

const isBrowser = typeof window !== "undefined";

type Props = {};

export const EzoicLoader: FC<Props> = memo(({}) => {
  const isAdmin = useIsAdmin();
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      if (isAdmin && isBrowser && ezstandalone) {
        // @ts-ignore
        console.log("> Ezoic init", ezstandalone);
        // @ts-ignore
        console.log("> Ezoic defines", 102);
        // @ts-ignore
        ezstandalone.define(102);
        // @ts-ignore
        console.log("> Ezoic enable", 102);
        // @ts-ignore
        ezstandalone.enable();
        // @ts-ignore
        ezstandalone.display();
      }
    }, 2000);
  }, []);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
});
