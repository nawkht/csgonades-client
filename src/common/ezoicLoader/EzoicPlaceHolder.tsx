import { FC, memo } from "react";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  return (
    <>
      <div id={`ezoic-pub-ad-placeholder-${id}`}></div>
      <style jsx>{`
        div {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
});
