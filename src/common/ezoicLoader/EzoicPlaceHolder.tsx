import { FC, memo } from "react";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const divId = `ezoic-pub-ad-placeholder-${id}`;
  const key = new Date().getMilliseconds();

  return <div key={key} id={divId}></div>;
});
