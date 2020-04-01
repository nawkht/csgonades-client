import { FC, memo, useRef, useEffect } from "react";
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
  const mutationObserver = new MutationObserver((mutation) => {
    mutation.forEach((mut) => {
      console.log("Mutation", mut);
    });
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const hidden = isHidden(ref.current);
    if (!hidden) {
      registerPlaceholder(id);
      mutationObserver.observe(ref.current, { subtree: true, childList: true });
    }
    return () => mutationObserver.disconnect();
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
