import { FC, memo } from "react";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  return (
    <>
      <div className="ez" id={`ezoic-pub-ad-placeholder-${id}`}></div>
      <style jsx>{`
        .ez {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
});
