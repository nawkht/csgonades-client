import { FC, useState, useEffect, useLayoutEffect, memo } from "react";

type Props = {
  minSize: number;
};

export const MinSizeRender: FC<Props> = memo((props) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  if (!render) {
    return null;
  }

  return <MinSizedComp {...props} />;
});

const MinSizedComp: FC<Props> = memo(({ children, minSize }) => {
  const [width] = useWindowSize();

  if (width < minSize) {
    return null;
  }

  return <>{children}</>;
});

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const useIsClientSide = () => {
  const [isClientSide, setIsClientSide] = useState(false);
  useEffect(() => {
    setIsClientSide(true);
  }, []);
  return isClientSide;
};
