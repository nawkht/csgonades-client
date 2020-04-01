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
  const [placeholderVisisble, setPlaceholderVisisble] = useState<boolean>(
    false
  );
  const ref = useRef<HTMLDivElement>(null);
  const registerPlaceholder = useRegisterPlaceholder();

  useEffect(() => {
    if (placeholderVisisble) {
      registerPlaceholder(id);
    }
  }, [placeholderVisisble]);

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      const ezoicInitialized = ezstandalone && ezstandalone.initialized;
      if (ref.current && ezoicInitialized) {
        const isSelected = ezstandalone.selectedPlaceholders[`${id}`];
        const adPresent = ref.current.innerHTML.includes("<iframe");
        console.log("> Check", id, {
          isSelected,
          adPresent,
        });
      }
    }, 15 * 1000);
    return () => clearTimeout(delayedCheck);
  }, [id]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const hidden = isHidden(ref.current);
    if (!hidden) {
      setPlaceholderVisisble(true);
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
