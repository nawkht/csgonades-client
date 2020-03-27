import { FC, memo } from "react";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const now = Date.now();

  return <div key={now.toString()} id={`ezoic-pub-ad-placeholder-${id}`}></div>;
});
