import { FC, memo } from "react";

type Props = {
  desc?: string;
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  return <div id={`ezoic-pub-ad-placeholder-${id}`}></div>;
});
