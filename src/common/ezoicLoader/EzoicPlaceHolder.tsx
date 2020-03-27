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
        <PlainPlaceHolder id={id} />
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

export const PlainPlaceHolder: FC<{ id: number }> = memo(({ id }) => {
  return <div id={`ezoic-pub-ad-placeholder-${id}`}></div>;
});
