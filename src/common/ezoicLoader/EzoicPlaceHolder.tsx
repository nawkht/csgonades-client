import { FC, memo } from "react";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const divId = `ezoic-pub-ad-placeholder-${id}`;
  console.log(`> ${divId} render`);
  return <div id={divId}></div>;
});
