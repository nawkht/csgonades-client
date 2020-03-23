import { FC, memo, useEffect } from "react";
import { useRegisterPlaceholder } from "../../store/AdStore/hooks";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id, height }) => {
  const registerPlaceHolder = useRegisterPlaceholder();

  useEffect(() => {
    registerPlaceHolder(id);
  }, [registerPlaceHolder, id]);

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
        }
      `}</style>
    </>
  );
});
