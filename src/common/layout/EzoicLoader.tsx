import { FC, useEffect } from "react";
import { useIsAdmin } from "../../store/AuthStore/AuthHooks";

const isBrowser = typeof window !== "undefined";

type Props = {};

export const EzoicLoader: FC<Props> = ({}) => {
  const isAdmin = useIsAdmin();
  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      if (isAdmin && isBrowser && window.startEzoic) {
        console.log("> Ezoic init");
        // @ts-ignore
        window.startEzoic();
      }
    }, 2000);
  }, []);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
};
