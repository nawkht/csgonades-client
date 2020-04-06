import { FC, memo, useState, useEffect, useCallback } from "react";

type Props = {
  id: number;
};

const isBrowser = typeof window !== "undefined";

export const EzoicPlaceHolder: FC<Props> = memo(({ id }) => {
  const [onClient, setOnClient] = useState(false);

  useEffect(() => {
    if (isBrowser) {
      setOnClient(true);
    }
  }, []);

  if (!onClient) {
    return null;
  }

  return <PurePlaceHolder id={id} />;
});

const PurePlaceHolder: FC<Props> = ({ id }) => {
  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }
      const placeHolderId = `ezoic-pub-ad-placeholder-${id}`;
      const ezoicPlaceholder = document.createElement("div");
      ezoicPlaceholder.setAttribute("id", placeHolderId);
      node.appendChild(ezoicPlaceholder);
    },
    [id]
  );

  console.log("> Render", id);

  return <div ref={ref} />;
};

/*
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
*/
