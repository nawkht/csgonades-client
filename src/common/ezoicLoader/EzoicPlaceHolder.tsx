import { FC, memo } from "react";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const placeHolderId = `ezoic-pub-ad-placeholder-${id}`;
  return <div id={placeHolderId} />;
});
