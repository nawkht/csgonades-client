import { FC, memo } from "react";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id, height, width }) => {
  return (
    <>
      <div className="ez-wrap" id={`ezoic-pub-ad-placeholder-${id}`}></div>
      <style jsx>{`
        .ez-wrap {
          width: ${width ? `${width}px` : "100%"};
          height: ${height ? `${height}px` : "auto"};
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
});
