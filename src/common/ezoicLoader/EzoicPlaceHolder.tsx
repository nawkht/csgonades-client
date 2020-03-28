import { FC, memo } from "react";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => (
  <div id={`ezoic-pub-ad-placeholder-${id}`} />
));
