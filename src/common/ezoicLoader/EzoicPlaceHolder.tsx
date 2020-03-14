import { FC, memo, useEffect } from "react";
import { useRegisterAdPlaceholder } from "../../store/AdvertStore/hooks";

type Props = {
  desc: string;
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const isBrowser = typeof window !== "undefined";
  const registerPlaceHolder = useRegisterAdPlaceholder();

  useEffect(() => {
    if (isBrowser) {
      const location = window.location.pathname + window.location.search;
      registerPlaceHolder(id, location);
    }
  }, [registerPlaceHolder, id, isBrowser]);

  return <div id={`ezoic-pub-ad-placeholder-${id}`}></div>;
});
