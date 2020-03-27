import { FC, memo } from "react";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const now = Date.now();
  const uniqueKey = `ezoic-pub-ad-placeholder-${id}-${now}`;

  return <div key={uniqueKey} id={`ezoic-pub-ad-placeholder-${id}`}></div>;
});
