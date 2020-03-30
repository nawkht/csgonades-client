import { FC, memo, useRef, useEffect } from "react";
import { useRegisterPlaceholder } from "../../store/AdStore/hooks";

type Props = {
  id: number;
};

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const registerPlaceholder = useRegisterPlaceholder();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const hidden = isHidden(ref.current);
    if (!hidden) {
      registerPlaceholder(id);
    }
  }, [id, registerPlaceholder]);

  const placeHolderId = `ezoic-pub-ad-placeholder-${id}`;

  return <div ref={ref} id={placeHolderId}></div>;
});

function isHidden(el: HTMLDivElement) {
  return el.offsetParent === null;
}
