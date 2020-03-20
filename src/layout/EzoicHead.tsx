import { FC, memo } from "react";
import { useAdRefresher } from "./useAdRefresher";

type Props = {};

export const EzoicHead: FC<Props> = memo(({}) => {
  useAdRefresher();

  return null;
});
