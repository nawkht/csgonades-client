import { FC, memo } from "react";
import { useNewAdRefresher } from "../layout/useAdRefresher";

export const AdSetup: FC = memo(({}) => {
  useNewAdRefresher();
  return null;
});
