import { FC, memo, useCallback } from "react";

type Props = {
  id: number;
  width?: number;
  height?: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const divId = `ezoic-pub-ad-placeholder-${id}`;

  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (node === null) {
        return;
      }
      if (id === 140) {
        setTimeout(() => {
          const content = node.innerHTML;
          console.log("> Placeholder content lenght", content.length);
        }, 2000);
      }
    },
    [id]
  );

  return <div ref={ref} key={divId} id={divId}></div>;
});
