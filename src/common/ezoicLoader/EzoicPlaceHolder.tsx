import { FC, memo } from "react";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id, height }) => {
  return (
    <>
      <div className="ez-div">
        <div id={`ezoic-pub-ad-placeholder-${id}`} />
      </div>
      <style jsx>{`
        .ez-div {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: ${height ? `${height}px` : "auto"};
        }
      `}</style>
    </>
  );
});
