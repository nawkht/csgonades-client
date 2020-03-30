import { FC, memo, useCallback } from "react";
import { useRegisterPlaceholder } from "../../store/AdStore/hooks";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const registerPlaceholder = useRegisterPlaceholder();

  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }
      if (node.offsetParent !== null) {
        registerPlaceholder(id);
      }
    },
    [id, registerPlaceholder]
  );

  const placeHolderId = `ezoic-pub-ad-placeholder-${id}`;

  return <div ref={ref} id={placeHolderId} />;
});
