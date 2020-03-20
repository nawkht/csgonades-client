import { FC, memo } from "react";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  return <div id={`ezoic-pub-ad-placeholder-${id}`}></div>;
});
