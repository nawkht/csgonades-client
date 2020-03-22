import { FC, memo } from "react";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const divId = `ezoic-pub-ad-placeholder-${id}`;
  return <div key={divId} id={divId}></div>;
});
