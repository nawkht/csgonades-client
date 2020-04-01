import { FC, memo, useRef, useEffect, useState } from "react";
import { useRegisterPlaceholder } from "../../store/AdStore/hooks";

type Props = {
  id: number;
};

const isBrowser = typeof window !== "undefined";

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  if (!isBrowser) {
    return null;
  }

  return <PlaceholderObserver id={id} />;
});

const PlaceholderObserver: FC<Props> = memo(({ id }) => {
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

  return (
    <div ref={ref}>
      <PurePlaceholder id={id} />
    </div>
  );
});

const PurePlaceholder: FC<Props> = memo(({ id }) => {
  const placeHolderId = `ezoic-pub-ad-placeholder-${id}`;
  return <div id={placeHolderId}></div>;
});

function isHidden(el: HTMLDivElement) {
  return el.offsetParent === null;
}
