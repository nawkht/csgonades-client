import { FC, memo } from "react";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id, height }) => {
  const divId = `ezoic-pub-ad-placeholder-${id}`;
  return (
    <>
      <div className="ez-div" key={divId} id={divId}></div>
      <style jsx>{`
        .ez-div {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: ${height ? `${height}px` : "auto"};
          background: url("/images/spinner.svg");
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
});
