import { FC, memo } from "react";
import { Config } from "../../constants/Constants";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const placeHolderId = `ezoic-pub-ad-placeholder-${id}`;

  if (!Config.ADS_ENABLED) {
    return null;
  }

  return <div id={placeHolderId} />;
});
