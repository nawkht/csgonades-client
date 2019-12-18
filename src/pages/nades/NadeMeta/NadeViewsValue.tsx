import { FC } from "react";

type Props = {
  views: number;
};

export const NadeViewsValue: FC<Props> = ({ views }) => {
  return (
    <>
      <span>{views}</span>
    </>
  );
};
